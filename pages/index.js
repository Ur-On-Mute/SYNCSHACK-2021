
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import Post from '../components/Post'
import 'bootstrap/dist/css/bootstrap.css'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react';
import ForumHeader from '../components/ForumHeader';

export default function Home() {

  const [posts, setPosts] = useState([
    {body : "This is a test post body",
    title : "This is a test post title"}
  ])

  return (
    <div className="App">
        <NavBar />
        <ForumHeader />
        <div className="posts">
          {posts.map(post => (
            <Post postBody={post.body} postTitle={post.title}/>
          ))}
        </div>
    </div>
  )
}
