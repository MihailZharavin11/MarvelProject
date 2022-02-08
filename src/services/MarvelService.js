import useHttp from '../Hooks/http.hooks';

const useMarvelService = () => {
    const _apiCode = '1bc7ce84491b34fe085720cc6b7cb6a5';
    const _offset = 511;
    const [loading, request, error,clearError] = useHttp();

    const getAllCharacter = async (offset = _offset) => {
        const res = await request(`characters?limit=9&offset=${offset}&apikey=${_apiCode}`)
            .then(response => response.data.data.results);

        return res.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`characters/${id}?apikey=${_apiCode}`)
            .then(response => response.data.data.results);
        return _transformCharacter(res[0]);
    }

    const getAllComics = async (offset) =>{
        const res = await request(`/comics?orderBy=-focDate&limit=8&offset=${offset}&apikey=1bc7ce84491b34fe085720cc6b7cb6a5`)
        .then(response => response.data.data.results);
        
        return res.map(_transformComics);
    }

    const getComics = async (id) =>{
        const res = await request(`/comics/${id}?apikey=1bc7ce84491b34fe085720cc6b7cb6a5`)
        .then(response => response.data.data.results);
        return _transformComics(res[0]);
    }

    const _transformCharacter = (response) => {
        return {
            id: response.id,
            name: response.name,
            description: response.description,
            thumbnail: response.thumbnail.path + '.' + response.thumbnail.extension,
            homepage: response.urls[0].url,
            wiki: response.urls[1].url,
            comics: response.comics.items
        }
    }

    const _transformComics = (response) =>{
        return {
            id:response.id,
            name: response.title,
            description:response.description || 'There is no description',
            pageCount:response.pageCount ? `${response.pageCount} p.`: 'No information about the number of pages',
            thumbnail: response.thumbnail.path + '.' + response.thumbnail.extension,
            language: response.textObjects.language || 'en-us',
            price:response.prices[0].price? `${response.prices[0].price} $ ` : 'not avaible'
        }
    }

    return [loading, error, getAllCharacter, getCharacter,clearError,getAllComics,getComics];
}

export default useMarvelService;