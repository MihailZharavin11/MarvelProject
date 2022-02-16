import React from 'react';
import './charSearchForm.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useState } from 'react/cjs/react.development';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

const Charsearchform = () => {

    const [char, setChar] = useState(null);
    const [charNotFound, setCharNotFound] = useState('');
    let { getCharacterByName, loading } = useMarvelService();

    const selectedChar = (char) => {
        setChar(char);
        setCharNotFound('');
    }

    const notSelectedChar = () => {
        setChar(null);
        setCharNotFound('The character was not found. Check the name and try again')
    }

    const onSubmitSearch = ({ name }) => {
        getCharacterByName(name).then((response) => {
            response ? selectedChar(response)
                : notSelectedChar();
        })
    }

    let validation = yup.object({
        name: yup.string().required('Обязательное поле').min(2, 'Введите более 2 букв')
    })


    const resultNotFound = charNotFound ?
        <div className="char__search-error">
            {charNotFound}
        </div>
        : null
    const resultFound = char ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char.name} page?</div>
            <Link to={`/character/${char.id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>
        : null;
    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={validation}
                onSubmit={value => onSubmitSearch(value)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field
                                type='text'
                                name='name'
                                placeholder='Enter name' />
                            <button
                                type="submit"
                                className="button button__main"
                                disabled={loading}>
                                <div className="inner">find</div>
                            </button>
                        </div>
                        <ErrorMessage className="char__search-error" name='name' component={'div'} />
                    </Form>
                )}
            </Formik>
            <div className="char__search-error">
                {resultNotFound}
                {resultFound}
            </div>
        </div>
    );
}

export default Charsearchform;
