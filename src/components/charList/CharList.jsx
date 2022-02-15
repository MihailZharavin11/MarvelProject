import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Errormessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import { Transition } from 'react-transition-group';

const CharList = (props) => {

    const [char, setChar] = useState([]);
    const [newItemLoading, setItemLoading] = useState(true);
    const [offset, setOffset] = useState(511);
    const [charEnded, setCharEnded] = useState(false);
    const [loading, error, getAllCharacter, getCharacter] = useMarvelService();
    const [inProp, setInProp] = useState(false);
    const duration = 500;
    const defaultStyle = {
        transition: `opacity  ${duration}ms ease-in-out`,
        opacity: 0,
        visibility:'hidden'
    }
    const transitionStyles = {
        entering: { opacity: 0,visibility:'hidden' },
        entered: { opacity: 1,visibility:'visible' },
        exiting: { opacity: 1 },
        exited: { opacity: 1 },
    };


    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setItemLoading(false) : setItemLoading(true);
        getAllCharacter(offset).then(onCharLoaded);
    }


    const onCharLoaded = (newChar) => {
        let ended = false;
        if (newChar.length < 9) {
            ended = true;
        }
        setChar(char => [...char, ...newChar]);
        setOffset(offset => offset + 9);
        setItemLoading(false);
        setCharEnded(ended);
        setInProp(true);
    }



    const onCharSelected = props.onCharSelected;
    const errorMessage = error ? <Errormessage /> : null;
    const loadingMessage = loading ? <Spinner /> : null;
    const charItem = char.map(element => <CharItem key={element.id} id={element.id}
        onCharSelected={onCharSelected}
        name={element.name}
        thumbnail={element.thumbnail} />)


    return (
        <div>
            {errorMessage}
            {loadingMessage}
            <Transition
            in={inProp}
            timeout={duration}
            
        >
            {
                state => (
                    <div
                        className="char__list"
                        style={{...defaultStyle,
                                ...transitionStyles[state]}}
                    >
                        <ul className="char__grid">
                            {charItem}
                        </ul>
                        <button className="button button__main button__long"
                            onClick={() => onRequest(offset)}
                            style={{ 'display': charEnded ? 'none' : 'block' }}
                            disabled={newItemLoading}>
                            <div className="inner">load more</div>
                        </button>
                    </div>
                )
            }
        </Transition>
        </div>
    )
}


const CharItem = ({ name, thumbnail, onCharSelected, id }) => {

    const addedClassActive = (element) => {
        element.classList.add('char__item_selected')
    }

    const deleteClassActive = (element) => {
        element.classList.remove('char__item_selected')
    }


    return (
        <li tabIndex={0} className="char__item" onClick={(e) => {
            onCharSelected(id);
            addedClassActive(e.currentTarget);
        }}
            onBlur={(e) => deleteClassActive(e.currentTarget)}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    addedClassActive(e.currentTarget);
                    onCharSelected(id);
                }
            }}>
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
        </li>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;