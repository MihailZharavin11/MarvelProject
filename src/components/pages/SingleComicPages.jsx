import { useParams,Link } from 'react-router-dom';
import { useState } from 'react';
import './singleComicPage.scss';
import Errormessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic,setComic] = useState(null);

    const [loading, error, getAllCharacter, getCharacter,clearError,getAllComics,getComics] =useMarvelService();
     
    useEffect(()=>{
        updateComic();
    },[comicId]);

    const updateComic = () =>{
        clearError();
        getComics(comicId).then(onComicLoaded);
    }

    const onComicLoaded= (comic) =>{
        setComic(comic);
    }


    const errorMessage = error ? <Errormessage /> : null;
    const loadingMessage = loading ? <Spinner /> : null;
    const content = !(error || loading||!comic) ? <View comic={comic}/> : null

    return (
       <>
        {errorMessage}
        {loadingMessage}
        {content}
       </>
    )
}

const View = ({comic}) =>{
    const {id,name,description,pageCount,thumbnail,language,price} = comic||'abc';

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;