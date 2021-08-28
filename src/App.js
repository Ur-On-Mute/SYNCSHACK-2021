import NavBar from './components/NavBar'
import Post from './components/Post'
import PostPage from './components/postPage';
import PostEditor from './components/create-post';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import ForumHeader from './components/ForumHeader';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Quiz from './components/Quiz.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addStyles } from 'react-mathquill';
import LoginPage from './components/LoginPage';
import {supabase} from './supabaseClient.js'
require('dotenv').config();

export default function App() {
  useEffect(() => {
    addStyles();
    getPosts();
  },[])
  const [posts, setPosts] = useState([]);

  // const [posts, setPosts] = useState([
  //   {
  //     body : "This is a test post body",
  //     title : "This is a test post title",
  //     tags : ["Trigonometry", "Algebra"],
  //     author : "math god",
  //     datePosted : new Date('December 17, 2013')
  //   },
  //   {
  //     body : "I mean it",
  //     title : "Made an interesting question about integration",
  //     tags : ["Calculus"],
  //     author : "William Saffery",
  //     datePosted : new Date('December 17, 2014')
  //   }
  // ])

  const getPosts = async () => {
    let {data, error} = await supabase
      .from("posts")
    if (data) {
      setPosts(data)
      setFilteredPosts(data);
    }
    console.log(data)
    console.log(posts);
  }

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState("");


  const addPost = async (postBody, postTags, postTitle, postAuthor, postQuestionBody) => {
    const {data, error} = await supabase
      .from('posts')
      .insert([
        {title: postTitle, body: postBody, tags: postTags, author: postAuthor, questionBody: postQuestionBody}
      ])
    getPosts();
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
        <NavBar setUser={setUser} user={user}/>
        <Switch>
          <Route path="/create-post" exact render={(props) => <PostEditor {...props} author={user} addPost={addPost}/>}/>
          <Route path="/login" exact component={() => <LoginPage setUser={setUser}/>}/>
          <Route path="/about" exact component={() => <About />}/>
          {posts.map(post => (
              <Route path={`/${post.id}`} exact render={(props) => (<PostPage {...props} postBody={post.body} postTitle={post.title} postAuthor={post.author} postQuestionBody={post.questionBody} datePosted={post.datePosted} postTags={post.tags} user={user} postId = {post.id}/>)} />
            ))}
          {posts.map(post => (
              <Route path={`/fork/${post.id}`} exact render={(props) => (<PostEditor {...props} postQuestionBody={post.questionBody} author={user} addPost={addPost}/>)} />
            ))}
          <div>
            <div style={{width: '50%', margin: 'auto'}} className='d-flex justify-content-center'>
                <input className='search-bar' onChange={handleQueryChange} value={searchQuery} placeholder="Search..."/>
            </div>
            <ForumHeader/>
            <div className="posts">
              {filteredPosts.map(post => (
                <Link to={`/${post.id}`}>
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
