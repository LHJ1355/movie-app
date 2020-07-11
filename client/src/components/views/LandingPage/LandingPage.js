import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {Row} from 'antd'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../common/MainImage'
import GridCard from './Section/GridCard'

function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovie, setMainMovie] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(1);

    const getMovies = (endPoint) => {
        Axios.get(endPoint)
        .then(({data}) => {
            setCurrentPage(data.page);
            setMovies([...Movies, ...data.results]);
            setMainMovie(data.results[0]);
        })
        .catch((err) => console.log(err)); 
    }

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        getMovies(endPoint);
    }, []);

    const loadMore = () =>{
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        getMovies(endPoint);
    }

    return (
        <div style={{width : '100%', margin :'0'}}>
            
            {/* main image */}
            {MainMovie &&  
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovie.backdrop_path}`} 
                            title={MainMovie.title} description={MainMovie.overview}/>}

            <div style={{width : '85%', margin : '1rem auto'}}>

                <h2>Movies by latest</h2>
                <hr />

                    {/* movie grid card */}
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => {
                            return(<React.Fragment key={index}>
                                <GridCard 
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} 
                                    id={movie.id} 
                                    title={movie.title}
                                />
                            </React.Fragment>)
                        })}
                    </Row>
            </div>

            <div style={{display : 'flex', justifyContent : 'center'}}>
                <button onClick={loadMore}>load more</button>
            </div>

        </div>
    )
}

export default LandingPage
