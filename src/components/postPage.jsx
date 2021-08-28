import { comment } from 'postcss-selector-parser';
import React from 'react'
import { useState } from 'react';
import Comment from './Comment';
import CommentEditor from './CommentEditor';
import Quiz from './Quiz';

const PostPage = (props) => {

    const [comments, setComments] = useState([
        {
            author: 'Jordan',
            body: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"',
            datePosted: new Date()
        }
    ]);

    const [newCommentFlag, setNewCommentFlag] = useState(false);

    const addComment = (commentBody) => {
        setComments([...comments, {body : commentBody, datePosted: new Date(), author: user}]);
        setNewCommentFlag(false);
      }

    const handleCommentDisplay = (value) => {
        setNewCommentFlag(value);
      }

    const user = props.user;

    return (
        <div>
            <div className="card card-default post-page">
                <a style={{textDecoration : 'none'}}>
                <div className="card-body">
                    <div>
                        <h4 style={{color: '#731111', display: 'inline-block'}} className='card-title'>
                            {props.postTitle}
                        </h4>
                        <p className="text-muted" style={{display: 'inline-block', float: 'right'}}>{props.postAuthor}</p>
                    </div>
                    <div>
                        {props.postTags.length > 0 ? props.postTags.map(tag => (
                            <span key={tag} style={{marginRight: 5}} className="badge bg-secondary align-top">{tag}</span>
                        )) : <br/>}
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <p style={{display: 'inline-block', float: 'right', color: 'black'}}>{props.datePosted.toLocaleDateString()}</p>
                    </div>
                    <p style={{color: '#1c1c1c', fontWeight: 500, display: 'inline-block', float: 'left'}} className='card-text'>{props.postBody}</p>
                    <Quiz> </Quiz>
                </div>
                </a>
            </div>
            {!newCommentFlag &&
                <button style={{width: '8%', marginLeft: '8%', marginTop: '3%', position: 'static'}} className='btn btn-danger create-post' onClick={() => (handleCommentDisplay(true))}>Post Comment</button>
            }
            {newCommentFlag && <CommentEditor addComment={addComment}/>}
            {newCommentFlag && <button style={{width: '10%', marginLeft: '8%', marginTop: '0%', position: 'static'}} className='btn btn-danger create-post' onClick={() => (handleCommentDisplay(false))}>Cancel Comment</button>}
            <div className="comments">
                {comments.map((comment) => (
                    <Comment author={comment.author} commentBody={comment.body} datePosted={comment.datePosted}/>
                ))}
            </div>
        </div>
    )
}

export default PostPage;
