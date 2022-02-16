import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import Errormessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);


    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.id])

    let {loading, error, getCharacter,clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };


    const updateChar = () => {
        const id = props.id;
        if (!id) {
            return;
        }
        clearError();
        getCharacter(id).then(onCharLoaded);
    }

    const errorMessage = error ? <Errormessage /> : null;
    const loadingMessage = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <View char={char}/> : null
    return (
        <div className="char__info">
            {errorMessage}
            {loadingMessage}
            {char || loadingMessage ? content : <Skeleton />}
        </div>
    )

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
            <li className="char__comics-item" key={element.name}>
                <ComicsItem title={element.name} />
            </li>
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
        <>
            {title}
        </>
    );
}

CharInfo.propTypes = {
    id: PropTypes.number
}

export default CharInfo;