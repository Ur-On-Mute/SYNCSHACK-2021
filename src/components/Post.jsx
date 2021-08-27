import React from 'react'

export default function Post(props) {
    return (
        <div>
            <div className="card card-default post-body">
                <a style={{textDecoration : 'none'}}>
                <div className="card-body">
                    <div>
                        <h4 style={{color: '#731111', display: 'inline-block'}} className='card-title'>
                            {props.postTitle}
                        </h4>
                        <p className="text-muted" style={{display: 'inline-block', float: 'right'}}>{props.author}</p>
                    </div>
                    <div>
                        {props.tags.map(tag => (
                            <span key={tag} className="badge bg-secondary align-top">{tag}</span>
                        ))}
                    </div>
                    <div>
                        <p style={{display: 'inline-block', float: 'right'}}>{props.datePosted.toLocaleDateString()}</p>
                    </div>
                    <p style={{color: 'grey', fontWeight: 600}} className='card-text'>{props.postBody}</p>
                </div>
                </a>
            </div>
        </div>
    )
}
