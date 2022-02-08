import React from "react";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, Comicspage,NoMatch,SingleComicPage } from '../pages';
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<Comicspage/>} />
                        <Route path="*" element = {<NoMatch/>} />
                        <Route path ='/comics/:comicId' element = {<SingleComicPage/>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;