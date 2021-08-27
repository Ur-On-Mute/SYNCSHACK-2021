import React from 'react'

export default function Post(props) {
    return (
        <div>
            <div className="card card-default post-body">
                <a style={{textDecoration : 'none'}}>
                <div className="card-body">
                    <h4 style={{color: '#731111'}} className='card-title'>
                        {props.postTitle}
                    </h4>
                    <p style={{color: 'grey', fontWeight: 600}} className='card-text'>{props.postBody}</p>
                </div>
                </a>
            </div>
        </div>
    )
}
