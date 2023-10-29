import React, { Component } from 'react'
import defaultImage from "../Alternate_Img.jpg";

const NewsItem = (props) => {

    let { source, author, title, description, imageUrl, newsUrl, content, date } = props;
    return (
        <div className='my-3'>

            <div className="card">
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                }>
                    <span className="badge rounded-pill bg-danger">
                        {source}</span>
                </div>
                <img src={!imageUrl ? defaultImage : imageUrl} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{title ? title : ''}</h5>
                    <p className="card-text">{description ? description : ''}</p>

                    <h5 className="card-title">Content</h5>
                    <p className="card-text">{content ? content : ''}</p>
                    <p className="card-text"><small className="text-danger">By {!author ? 'Unknown' : author} on {new Date(date).toUTCString()}</small></p>

                    <a href={newsUrl} target='_blank' className="btn btn-dark btn-sm">Go for details</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
