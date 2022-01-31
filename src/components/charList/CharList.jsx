import React from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Errormessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');
    }


    state = {
        char: [],
        loading: true,
        error:false,
        newItemLoading:true,
        offset:511,
        charEnded:false
    }

    marvelServise = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) =>{
        this.setState({
            newItemLoading:true
        })
        this.marvelServise.getAllCharacter(offset).then(this.onCharLoaded).catch(this.onEror);
    }


    onCharLoaded = (newChar) => {
        let ended = false;
        if(newChar.length<9){
            ended = true;
        }
        this.setState(({char,offset})=>(
            {
            char:[...char,...newChar],
            loading:false,
            offset:offset+9,
            newItemLoading:false,
            charEnded:ended
            }
        ))
    }

    onEror = () =>{
        this.setState({
            loading:false,
            error:true
        })
    }

    

    render() {
        const {loading,error,offset,newItemLoading,charEnded} = this.state;
        const char = this.state.char;
        const onCharSelected = this.props.onCharSelected;
        const errorMessage = error? <Errormessage/> : null;
        const loadingMessage = loading? <Spinner/> : null;  
        const charItem = char.map(element => <CharItem key={element.id} id = {element.id} onCharSelected={onCharSelected} name={element.name} thumbnail={element.thumbnail} />)
        const content = !(loading || error)?charItem:null
        debugger;
        return (
            <div className="char__list">
                {errorMessage}
                {loadingMessage}
                <ul className="char__grid">    
                    {content}
                </ul>
                <button className="button button__main button__long"
                        onClick={()=>this.onRequest(offset)}
                        style={{'display':charEnded?'none':'block'}}
                        disabled={newItemLoading}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


const CharItem = ({ name, thumbnail,onCharSelected,id }) => {
    return (
        <li className="char__item" onClick={()=>{onCharSelected(id)}}>
            <img src={thumbnail} alt="abyss" />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;