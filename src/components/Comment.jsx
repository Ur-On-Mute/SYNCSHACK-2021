import React from 'react'

export default function Comment(props) {
    return (
        <div>
            <div className="card card-default comment-body">
                <a style={{textDecoration : 'none'}}>
                <div className="card-body">
                    <p className='card-text' style={{float: 'right', paddingLeft:"10px"}}>{props.author}</p>
                    <p style={{color: '#1c1c1c', fontWeight: 500, float: 'left', width:'80%'}} className="card-text">{props.commentBody}</p>
                    <div style={{textAlign: 'right'}}>
                        <p className="text-muted" style={{float: 'right', color: 'black'}}>{props.datePosted}</p>
                    </div>
                </div>
                </a>
            </div>
        </div>
    )
}
