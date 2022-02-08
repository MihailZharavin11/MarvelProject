import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Errormessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    const [newItemLoading, setItemLoading] = useState(true);
    const [loading, error, getAllCharacter, getCharacter, clearError, getAllComics] = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setItemLoading(false) : setItemLoading(true);
        getAllComics(offset).then(onComicsLoaded);
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 8);
        setItemLoading(false);
        setCharEnded(ended);
    }

    const errorMessage = error ? <Errormessage /> : null;
    const loadingMessage = loading || newItemLoading ? <Spinner /> : null;
    const comicsElement = comics.map((element,i) => {
        return (
            <li key={i} className="comics__item">
                <Link to={`/comics/${element.id}`} >
                    <img src={element.thumbnail} alt="ultimate war" className="comics__item-img" />
                    <div className="comics__item-name">{element.name}</div>
                    <div className="comics__item-price">{element.price}</div>
                </Link>
            </li>
        );
    })

    return (
        <div className="comics__list">
            {errorMessage}
            {loadingMessage}
            <ul className="comics__grid">
                {comicsElement}
            </ul>
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{'display':charEnded?'none':'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;