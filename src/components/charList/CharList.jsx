import React from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';

class CharList extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');
    }


    state = {
        char: []
    }

    marvelServise = new MarvelService();

    componentDidMount() {
        this.marvelServise.getAllCharacter().then(this.onCharLoaded);
        console.log('mount')
    }

    onCharLoaded = (char) => {
        this.setState({
            char
        })
    }

    render() {
        const char = this.state.char;
        const charItem = char.map(element => <CharItem key={element.id} name={element.name} thumbnail={element.thumbnail} />)
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charItem}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


const CharItem = ({ name, thumbnail }) => {
    return (
        <li className="char__item">
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;