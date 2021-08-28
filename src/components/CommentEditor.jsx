import {React, useState} from 'react'

export default function CommentEditor(props) {

    const [commentBody, setCommentBody] = useState('');

    const createComment = (event) => {
        event.preventDefault();
        props.addComment(commentBody);
    }

    const handleCommentBodyChange = (e) => {
        setCommentBody(e.target.value);
    }

    return (
        <div>
            <div>
                <div className="create-post-page card">
                    <form className="needs-validation" onSubmit={createComment}>
                        <div>
                            <div className="form-group row">
                                <label for="comment-body-input" className="col-sm-1 col-form-label">Body: </label>
                                <textarea id = "comment-body-input" className="col-sm-10" onChange={handleCommentBodyChange} placeholder="Comment Description" value={commentBody} required></textarea>
                            </div>
                            <br />
                            <button className="btn btn-outline-success" type="submit">Submit Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
