import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import MainImage from '../common/MainImage'
import MovieInfo from './Section/MovieInfo'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import Favorite from './Section/Favorite'

export default function(props){
    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState(null);

    useEffect(() => {
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        Axios.get(endpointInfo)
        .then(({data}) => {
            setMovie(data);
        })
        .catch((err) => console.log(err))
    },[])
    return (
        <div style={{width : '100%', margin : '0'}}>
            {Movie && <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} title={Movie.title} description={Movie.overview}/>}
            <div style={{width : '85%', margin : '1rem auto'}}>
                    <div style={{display : 'flex', justifyContent : 'flex-end'}}>
                        {Movie && localStorage.getItem('userId') && <Favorite userFrom={localStorage.getItem('userId')} movie={Movie}></Favorite>}
                    </div>

                    {/*movie info*/}
                    {Movie && <MovieInfo movie={Movie}/>}
            </div>
        </div>
    )
}