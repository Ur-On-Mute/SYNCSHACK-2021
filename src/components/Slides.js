import {useState, useEffect, useRef} from 'react';
import '../slides.css'

function Slide(props) {
  return (
    <div className="slide"
    style={{width: `${props.width}`, height: `${props.height}`}}
    >
      {props.children}
    </div>
  )
}


function Slides(props) {
  const [current, setCurrent] = useState(0)
  const {children, width, height} = props
  const slidesRef = useRef(null)
  const size = Number(props.width.replace(/\D/g, ""))

  function next() {
    setCurrent(current+1);
    if (current >= props.total-1) {
      setCurrent(0);
    }
  }
  function goto(n) {
    setCurrent(n);
  }

  useEffect(() => {
  if (slidesRef == null) return;
   slidesRef.current.style.transition = 'all 0.2s ease-in-out'
   slidesRef.current.style.transform = `translateX(-${current*size}em)`
   // slidesRef.current.style.transform = `translateX(-${current*Number(props.width)}em)`
  }, [current])

  return (
    <>
    <div className="slide-wrapper">
    <div className="slide-subwrapper" ref={slidesRef}
    width={props.width} height={props.height}>
    {children.map(c => (
      <Slide width={props.width} height={props.height}>
       {c}
      </Slide>
    ))}
    </div>
    </div>
    <button onClick={()=>next()}>
    </button>
    </>
  )
}

export default Slides;
