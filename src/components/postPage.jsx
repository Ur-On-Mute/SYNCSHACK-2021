import { comment } from 'postcss-selector-parser';
import React from 'react'
import { useState, useEffect } from 'react';
import Comment from './Comment';
import CommentEditor from './CommentEditor';
import Quiz from './Quiz';
import { supabase } from '../supabaseClient';
import {
    WYSIWYGEditor,
    SigmaMathRenderer,
  } from "./sigma_math_renderer";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import dark from "./material_dark";

const PostPage = (props) => {

    useEffect(() => {
        getComments();
    }, [])

    const [showSource, setShowSource] = useState(false);

    const [comments, setComments] = useState([]);

    const [newCommentFlag, setNewCommentFlag] = useState(false);

    const addComment = async (commentBody) => {
        const {data, error} = await supabase
            .from("comments")
            .insert([{
                body : commentBody, datePosted: new Date(), user: user, post_id: props.postId
            }])
        console.log("FINISHED");
        setNewCommentFlag(false);
        getComments();
      }

    const handleCommentDisplay = (value) => {
        setNewCommentFlag(value);
      }

    const getComments = async () => {
        let {data, error} = await supabase
            .from("comments")
            .select()
            .filter('post_id', 'eq', props.postId)
        if (data) {
            setComments(data)
        }
        console.log(data);
    }

    const user = props.user;

    return (
        <div>
            <div className="card card-default post-page">
                <a style={{textDecoration : 'none'}}>
                <div className="card-body">
                    <div style={{textAlign: 'right'}}>
                        <p style={{display: 'inline-block', float: 'right', color: 'black'}}>{props.datePosted}</p>
                    </div>
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
                    <p style={{color: '#1c1c1c', fontWeight: 500, display: 'inline-block', float: 'left'}} className='card-text'>{props.postBody}</p>
                    <button className='btn btn-outline-danger' onClick={()=>{setShowSource(!showSource)}}>Show Source Code</button>
                    {showSource && 
                        <SyntaxHighlighter language="xml" style={dark}>
                            {props.postQuestionBody}
                        </SyntaxHighlighter>
                    }
                    <SigmaMathRenderer XML={props.postQuestionBody}/>
                    {/* <Quiz> </Quiz> */}
                </div>
                </a>
            </div>
            {!newCommentFlag &&
                <button style={{width: '8%', marginLeft: '8%', marginTop: '3%', position: 'static'}} className='btn btn-danger create-post' onClick={() => (handleCommentDisplay(true))}>Post Comment</button>
            }
            {newCommentFlag && <button style={{width: '10%', marginLeft: '8%', marginTop: '3%', position: 'static'}} className='btn btn-danger create-post' onClick={() => (handleCommentDisplay(false))}>Cancel Comment</button>}
            {newCommentFlag && <CommentEditor addComment={addComment}/>}
            
            <div className="comments">
                {comments.map((comment) => (
                    <Comment author={comment.user} commentBody={comment.body} datePosted={comment.datePosted}/>
                ))}
            </div>
        </div>
    )
}

export default PostPage;
