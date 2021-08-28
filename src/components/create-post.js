import React, {useState} from 'react'
import Select from 'react-select';
import NavBar from './NavBar';
import { Link, withRouter } from 'react-router-dom';

function PostEditor(props) {

    const [postBody, setPostBody] = useState("");
    const [tags, setTags] = useState([]);
    const [postTitle, setPostTitle] = useState("");

    const options = [
        {value: 'maths', label: 'Maths'},
        {value: 'english', label: 'English'},
        {value: 'science', label: 'Science'},
        {value: 'history', label: 'History'},
    ]

    const createPost = (event) => {
        event.preventDefault();
        props.addPost(postBody, tags, postTitle, props.author);
        setPostBody("")
        props.history.push('/');
     }

    const handlePostBodyChange = (e) => {
        setPostBody(e.target.value);
    }

    const handlePostTitleChange = (e) => {
        setPostTitle(e.target.value);
    }

    // const handleTagsChange = (event) => {
    //     if (event.target.checked) {
    //         setTags(prevTags => ([...prevTags, event.target.name]))
    //     } else {
    //         let index = tags.indexOf(event.target.name);
    //         let array = [...tags];
    //         array.splice(index, 1);
    //         setTags(array);
    //     }
        
    //     console.log(tags);
    // }

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
                            <br></br>
                            <div className="form-group row">
                                <label for="post-body-input" className="col-sm-1 col-form-label">Description: </label>
                                <textarea id = "post-body-input" className="col-sm-10" onChange={handlePostBodyChange} placeholder="Post Description" value={postBody}></textarea>
                            </div>
                            <br />
                            <textarea rows="50" className="question-input">PLACEHOLDER FOR QUESTION INPUT</textarea>
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

