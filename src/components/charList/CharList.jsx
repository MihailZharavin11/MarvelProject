import React from 'react';
import PropTypes from 'prop-types';
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
        const charItem = char.map(element => <CharItem key={element.id} id = {element.id} 
                                            onCharSelected={onCharSelected} 
                                            name={element.name} 
                                            thumbnail={element.thumbnail} />)
        const content = !(loading || error)?charItem:null
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
    const addedClassActive = (element)=>{
        element.classList.add('char__item_selected')
    }
    const deleteClassActive = (element) =>{
        element.classList.remove('char__item_selected')
    }


    return (
        <li tabIndex={0}  className="char__item" onClick={(e)=>{
            onCharSelected(id);
            addedClassActive(e.currentTarget);
        }}
        onBlur={(e)=>deleteClassActive(e.currentTarget)}
        onKeyPress={(e)=>{
            if(e.key==='Enter'|| e.key ===' '){
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