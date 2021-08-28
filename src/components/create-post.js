import React, {useState} from 'react'
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';
import {
    WYSIWYGEditor,
    SigmaMathRenderer,
  } from "./sigma_math_renderer";

function PostEditor(props) {
    const [postBody, setPostBody] = useState("");
    const [questionBody, setQuestionBody] = useState(props.postQuestionBody || "");
    const [tags, setTags] = useState([]);
    const [postTitle, setPostTitle] = useState("");

    const options = [
        {value: 'Calculus', label: 'Calculus'},
        {value: 'Trigonometry', label: 'Trigonometry'},
        {value: 'Algebra', label: 'Algebra'},
        {value: 'Geometry', label: 'Geometry'},
        {value: 'Year 1', label: 'Year 1'},
        {value: 'Year 2', label: 'Year 2'},
        {value: 'Year 3', label: 'Year 3'},
        {value: 'Year 4', label: 'Year 4'},
        {value: 'Year 5', label: 'Year 5'},
        {value: 'Year 6', label: 'Year 6'},
        {value: 'Year 7', label: 'Year 7'},
        {value: 'Year 8', label: 'Year 8'},
        {value: 'Year 9', label: 'Year 9'},
        {value: 'Year 10', label: 'Year 10'},
        {value: 'Year 11', label: 'Year 11'},
        {value: 'Year 12', label: 'Year 12'},
    ]

    const createPost = (event) => {
        event.preventDefault();
        props.addPost(postBody, tags, postTitle, props.author, questionBody);
        setPostBody("")
        props.history.push('/');
     }

    const handlePostBodyChange = (e) => {
        setPostBody(e.target.value);
    }

    const handlePostTitleChange = (e) => {
        setPostTitle(e.target.value);
    }

    const handleMultiChange = (inputValue) => {
        setTags(inputValue.map(x => (x.value)))
    }

    return (
        <div>
            <div>
                <div className="create-post-page card">
                    <form className="needs-validation" onSubmit={createPost}>
                        <div>
                            <div className="form-group row">
                                <label for="titleInput" className="col-sm-1 col-form-label">Title: </label>
                                <input type="text" id="titleInput" value={postTitle} onChange={handlePostTitleChange} className="col-sm-10" placeholder="Post Title" required/>
                            </div>
                            <div className="form-group row tag-row">
                                <label className="col-sm-1 col-form-label" for="tag-select">Add Tags:</label>
                                <div className="col-sm-10 tag-input">
                                    <Select className="col-sm-3" id="tag-select" options={options} isMulti={true} onChange={handleMultiChange}/>
                                </div>
                            </div>
                            <br/>
                            <div>
                            <h2>XML Editor</h2>
                            <WYSIWYGEditor questionBody={questionBody} setQuestionBody={setQuestionBody}/>
                            </div>
                            <br />
                            <button className="btn btn-outline-success" type="submit">Submit Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(PostEditor);

