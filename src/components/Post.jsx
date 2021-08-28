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
                        {props.tags.length > 0 ? props.tags.map(tag => (
                            <span key={tag} style={{marginRight: 5}} className="badge bg-secondary align-top">{tag}</span>
                        )) : <br/>}
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <p style={{display: 'inline-block', float: 'right', color: 'black'}}>{props.datePosted}</p>
                    </div>
                    <p style={{color: '#1c1c1c', fontWeight: 500, display: 'inline-block', float: 'left'}} className='card-text'>{props.postBody}</p>
                    
                </div>
                </a>
            </div>
        </div>
    )
}
