import NavBar from './components/NavBar'
import Post from './components/Post'
import PostPage from './components/postPage';
import PostEditor from './components/create-post';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import ForumHeader from './components/ForumHeader';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Quiz from './components/Quiz.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addStyles } from 'react-mathquill';

export default function App() {
  useEffect(() => addStyles(),[])
  const [posts, setPosts] = useState([
    {
      body : "This is a test post body",
      title : "This is a test post title",
      tags : ["Trigonometry", "Algebra"],
      author : "math god",
      datePosted : new Date('December 17, 2013')
    },
    {
      body : "I mean it",
      title : "Made an interesting question about integration",
      tags : ["Calculus"],
      author : "William Saffery",
      datePosted : new Date('December 17, 2014')
    }
  ])

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState("John Doe");


  const addPost = (postBody, postTags, postTitle, postAuthor) => {
    setPosts([...posts, {
      body : postBody, tags : postTags, title : postTitle, author : postAuthor, datePosted : new Date()
    }]);
    setFilteredPosts([...posts, {
      body : postBody, tags : postTags, title : postTitle, author : postAuthor, datePosted : new Date()
    }]);
  }

  const handleQueryChange = (e) => {
    const query = e.target.value;
    const filtered = posts.filter(post => {
      return (post.title.toLowerCase().includes(query.toLowerCase()) || post.tags.includes(query) || post.author.toLowerCase().includes(query.toLowerCase()));
    })
    setSearchQuery(query);
    setFilteredPosts(filtered);
  }

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/create-post" exact render={(props) => <PostEditor {...props} author={user} addPost={addPost}/>}/>
          {posts.map(post => (
              <Route path={`/${post.body.replaceAll(' ', '-')}`} exact render={(props) => (<PostPage {...props} postBody={post.body} postTitle={post.title} postAuthor={post.author} datePosted={post.datePosted} postTags={post.tags} user={user}/>)} />
            ))}
          <div>
            <div style={{width: '50%', margin: 'auto'}} className='d-flex justify-content-center'>
                <input className='search-bar' onChange={handleQueryChange} value={searchQuery} placeholder="Search..."/>
            </div>
            <ForumHeader/>
            <div className="posts">
              {filteredPosts.map(post => (
                <Link to={`/${post.body.replaceAll(' ', '-')}`}>
                <Post key={post.body} postBody={post.body} postTitle={post.title} tags={post.tags} author={post.author} datePosted={post.datePosted}/>
                </Link>
              ))}
            </div>
          </div>
        </Switch>
      </Router>
    </div>
  )
}
