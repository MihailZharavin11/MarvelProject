import axios from 'axios';

class MarvelService {
    _apiCode = '1bc7ce84491b34fe085720cc6b7cb6a5';
    _offset = 511;

    createBaseApi = () => {
        return axios.create({
            baseURL: 'https://gateway.marvel.com:443/v1/public/',
        })
    }

    
    getAllCharacter = async ( offset = this._offset) => {
        const res = await this.createBaseApi().get(`characters?limit=9&offset=${offset}&apikey=${this._apiCode}`)
            .then(response => response.data.data.results);
            
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.createBaseApi().get(`characters/${id}?apikey=${this._apiCode}`)
            .then(response => response.data.data.results);
        return this._transformCharacter(res[0]);
    }

    getComics = async (id) =>{
        const res = await this.createBaseApi().get(`characters/${id}/comics?limit=10&apikey=${this._apiCode}`)
            .then(response => response.data.data.results);
        return res;
    }

    _transformCharacter = (response) => {
        return {
            id:response.id,
            name: response.name,
            description: response.description,
            thumbnail: response.thumbnail.path + '.' + response.thumbnail.extension,
            homepage: response.urls[0].url,
            wiki: response.urls[1].url,
            comics: response.comics.items
        }
    }

}

export default MarvelService;