import React, { Component } from 'react';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import Errormessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    state = {
        char: null,
        comics: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            this.updateChar();
        }
    }

    marvelServise = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onEror = () => {
        this.setState({
            loading: true,
            error: true
        })
    }

    updateChar = () => {
        const id = this.props.id;

        if (!id) {
            return;
        }

        this.setState({
            loading: true
        })

        this.marvelServise.getCharacter(id).then(this.onCharLoaded).catch(this.onEror)
    }


    render() {
        const { char, loading, error, comics } = this.state;
        const errorMessage = error ? <Errormessage /> : null;
        const loadingMessage = loading ? <Spinner /> : null;
        const content = !(error || loading) ? <View char={char} comics={comics} /> : null
        return (
            <div className="char__info">
                {errorMessage}
                {loadingMessage}
                {char || loadingMessage ? content : <Skeleton />}
            </div>
        )
    }
}


const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char;
    let imgStyle = { 'objectFir': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }
    const comicsElement = comics.map((element, i) => {
        if (i > 10) {
            return;
        }
        return (
            <ComicsItem key={element.id} title={element.name} />
        )
    })
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsElement.length > 0 ? comicsElement : 'This character did not appear in the comics.'}
            </ul>
        </>
    );
}

const ComicsItem = ({ title }) => {
    return (
        <li className="char__comics-item">
            {title}
        </li>
    );
}

export default CharInfo;