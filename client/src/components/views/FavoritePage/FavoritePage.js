import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {Popover} from 'antd'
import './FavoritePage.css'
import {IMAGE_BASE_URL} from '../../Config'

export default function(){
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    

    const renderCard = favoriteMovies.map((movie, index) => {
            const content = (
                <div style={{width : '300px'}}>
                    <img style={{maxWidth : '100%'}} src={`${IMAGE_BASE_URL}w500${movie.moviePoster}`}/>
                </div>
            )
            
            return (
                <tr key={index}>
                   <Popover content={content} title={movie.movieTitle}>
                       <td> 
                            <Link to={`movie/${movie.movieId}`}>{movie.movieTitle}</Link>
                        </td>
                    </Popover>
                   <td>{movie.movieRunTime}min</td>
                </tr>
            )
        })

    useEffect(() => {
        Axios.post('/api/favorite/getFavoriteMovie', { userFrom : localStorage.getItem('userId')})
        .then(res => {
            console.log(res.data);
            setFavoriteMovies(res.data.favoriteMovies);
        })
        .catch(err => console.log(err))
    }, [])
    
    return(
        <div style={{width : '85%', margin : '3rem auto'}}>
            <h2>Favorite Movie</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCard}
                </tbody>
            </table>
        </div>
    )
}