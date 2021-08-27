
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import Post from '../components/Post'
import 'bootstrap/dist/css/bootstrap.css'
import {useState} from 'react';
import ForumHeader from '../components/ForumHeader';

export default function Home() {

  const [posts, setPosts] = useState([
    {
      body : "This is a test post body",
      title : "This is a test post title",
      tags : ["Trigonometry", "Algebra"]
    },
    {
      body : "arositenairostn",
      title : "This is a second test post",
      tags : ["Calculus"]
    }
  ])

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryChange = (e) => {
    const query = e.target.value;
    const filtered = posts.filter(post => {
      return (post.title.toLowerCase().includes(query.toLowerCase()) || post.tags.includes(query));
    })
    setSearchQuery(query);
    setFilteredPosts(filtered);
  }

  return (
    <div className="App">
        <NavBar />
        <div style={{width: '50%', margin: 'auto'}} className='d-flex justify-content-center'>
            <input className='search-bar' onChange={handleQueryChange} value={searchQuery} placeholder="Search..."/>
        </div>
        <ForumHeader/>
        <div className="posts">
          {filteredPosts.map(post => (
            <Post key={post.body} postBody={post.body} postTitle={post.title} tags={post.tags}/>
          ))}
        </div>
    </div>
  )
}
