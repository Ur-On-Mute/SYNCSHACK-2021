import React, {useState} from 'react'
import Select from '../node_modules/react-select';
import NavBar from '../components/NavBar';
import Link from 'next/link';

function PostEditor(props) {

    const [postBody, setPostBody] = useState("");
    const [tags, setTags] = useState([]);

    const options = [
        {value: 'maths', label: 'Maths'},
        {value: 'english', label: 'English'},
        {value: 'science', label: 'Science'},
        {value: 'history', label: 'History'},
    ]

    // const createPost = (event) => {
    //     event.preventDefault();
    //     props.addPost(postBody, tags);
    //     setPostBody("")
    // }

    const handlePostBodyChange = (e) => {
        setPostBody(e.target.value);
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
                <NavBar/>
                <div className="create-post-page card">
                    <form>
                        <div style={{display: 'inline-block'}}>
                            <input type="text" value={postBody} onChange={handlePostBodyChange} placeholder="Post Title" />
                        </div>
                        <div style={{display: 'inline-block', float: 'right'}}>
                            <label>Add tags:</label>
                            <div style={{width: '100%', display:'inline-block'}}>
                                <Select  options={options} isMulti={true} onChange={handleMultiChange}/>
                            </div>
                        </div>
                        <br></br>
                        <textarea></textarea>
                        <Link href="/">
                            <button className="btn btn-outline-success" type="submit">Submit Post</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostEditor;

