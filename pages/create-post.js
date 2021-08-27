import React, {useState} from 'react'
import Select from '../node_modules/react-select';

function PostEditor(props) {

    const [postBody, setPostBody] = useState("");
    const [tags, setTags] = useState([])
    const options = [
        {value: 'maths', label: 'Maths'},
        {value: 'english', label: 'English'},
        {value: 'science', label: 'Science'},
        {value: 'history', label: 'History'},
    ]

    // const createPost = (event) => {
    //     event.preventDefault();
    //     props.addPost(postBody, tags);
    //     console.log(tags);
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
                <div>
                    <form>
                        <textarea type="text" value={postBody} onChange={handlePostBodyChange} placeholder="Post Body" /><br />
                        <label>Add tags:</label>
                        <div style={{width: '25%'}}>
                            <Select  options={options} isMulti={true} onChange={handleMultiChange}/>
                        </div>

                        <button className="btn btn-outline-success" type="submit">Submit Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostEditor;

