import React from 'react'
import {Link} from 'react-router-dom'
import {Col} from 'antd'

export default function({image, id, title}){
    return(
        <Col lg={6} md={8} xs={24}>
            <div style={{position : 'relative'}}>
                <Link to={`movie/${id}`}>
                    <img style={{width :'100%', height : '320px'}} src={image} alt={title}/>
                </Link>
            </div>
        </Col>
    )
}