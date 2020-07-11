import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {Button} from 'antd'

export default function({userFrom, movie}){
    const [favoriteNumber, setNumber] = useState(0);
    const [Like, setLike] = useState(false);
        
    let variables = {
        userFrom : userFrom,
        movieId : movie.id,
        movieTitle : movie.title,
        movieRunTime : movie.runtime,
        moviePoster : movie.poster_path
    }
    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then((res) => {
            setNumber(res.data.favoriteNumber)
        })
        .catch((err) => console.log(err))

        Axios.post('/api/favorite/favorited', variables)
        .then((res) => {
            setLike(res.data.result)
        })
        .catch((err) => console.log(err))
    },[])

    const onClickLike = () => {
        if(!Like){
            {/* 싫어요 to 좋아요 */}
            Axios.post('/api/favorite/addToFavorite', variables)
            .then((res) => {
                setNumber(favoriteNumber + 1)
                setLike(!Like)
            })
            .catch((err) => console.log(err))      
        }
        else{
            {/* 좋아요 to 싫어요 */}
            Axios.post('/api/favorite/deleteFromFavorite', variables)
            .then((res) => {
                setNumber(favoriteNumber - 1)
                setLike(!Like)
            })
            .catch((err) => console.log(err))  
        }
    }
    return (
        <Button onClick={onClickLike}>{!Like ? 'I Like it !' : "I don't like it"} {favoriteNumber}</Button>
    )
}