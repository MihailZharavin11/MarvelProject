import axios from 'axios';
import {useState,useCallback} from 'react';


const useHttp = ()=>{
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const request = useCallback(( async (url,method = 'GET', body=null, headers ={'Content-Type':'application/json'} )=>{
        setLoading(true);
        const instance = axios.create({
            baseURL:'https://gateway.marvel.com:443/v1/public/',
            headers,
            method,
            body
        })

        try {
            const response = await instance.get(url);
            if(response.statusText!=='OK'){
                throw new Error(`Could not fetch ${url},status:${response.status}`);
            }
            const data = response;
            setLoading(false);
            return data
        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }
    }),[])

    const clearError = useCallback(()=>{ setError(null)});


    return [loading,request,error,clearError]
};

export default useHttp;
