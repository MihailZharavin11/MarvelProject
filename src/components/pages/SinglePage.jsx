import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const Singlepage = ({ Component, type }) => {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComics, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (type) {
            case 'comic':
                getComics(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
                break;
            default:
                throw new Error();

        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;


    return (
        <div>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

export default Singlepage;
