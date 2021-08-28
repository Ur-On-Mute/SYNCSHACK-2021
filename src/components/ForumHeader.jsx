import React, {useState} from 'react'
import { Link, withRouter } from 'react-router-dom'

const ForumHeader = (props) => {
    return (
        <div>
            <div style={{width: '60%', margin: 'auto'}}>
                <Link to="/create-post">
                    <button className='btn btn-danger create-post'>Create Question</button>
                </Link>
            </div>
        </div>
    )
}

export default withRouter(ForumHeader)