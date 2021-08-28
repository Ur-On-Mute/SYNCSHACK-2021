function Slides(props) {
  const [current, setCurrent] = useState(0)
  function next() {
    if (current > props.total) {
      setCurrent(0);
    }
    else {
      setCurrent(current+1);
    }
  }
  function goto(n) {
    setCurrent(n);
  }
  return (
    <div {..props}}>

    </div>
    
  )
}

export default Slides;
