import React, { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends React.Component {
    state= {
        selectedChar: null
    }

    onCharSelected = (id) =>{
        this.setState({
            selectedChar:id
        })
    }
    render() {
        const id = this.state.selectedChar;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected = {this.onCharSelected}/>
                        <CharInfo id = {id}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;