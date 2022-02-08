import React,{lazy,Suspense} from "react";
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const App = () => {

    const  NonMatch = lazy(()=> import('../pages/NoMatch'));
    const MainPage = lazy(()=> import('../pages/MainPage'));
    const ComicsPage = lazy(()=> import('../pages/ComicsPage'));
    const SingleComicPage = lazy(()=> import('../pages/SingleComicPages'));
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>} />
                        <Route path="*" element = {<NonMatch/>} />
                        <Route path ='/comics/:comicId' element = {<SingleComicPage/>} />
                    </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;