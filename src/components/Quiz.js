import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {Button, Form} from 'react-bootstrap';
import evaluatex from 'evaluatex/dist/evaluatex';
import Center from './Center.js';
import {EditableMathField, StaticMathField} from 'react-mathquill'

class MetaEq {
  constructor(left, right, constants, constant_ranges) {
    this.LHS = left;
    this.RHS = right;
    this.constants = constants;
    this.constant_ranges = constant_ranges;
    this.constant_vals = null
  }
}

class Question {
  constructor(header, description, metaEq) {
    this.header = header;
    this.description = description;
    this.metaEq = metaEq;
  }
}

function Equation(props){
  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max-min));
  }
  const [equation_string, setEq] = useState();

  useEffect(() => {
    setEq(generate(props.metaEq));
  }, [])

  function generate(metaEq) {
    if (metaEq == null) {return;}
    var left = metaEq.LHS;
    var right = metaEq.RHS;
    const constants = metaEq.constants;
    const constant_ranges = metaEq.constant_ranges;
    var constant_vals = {};
    for (var i = 0; i < constants.length; i++) {
      const rand_val = getRandomInt(0, constant_ranges[i]);
      constant_vals[constants[i]] = rand_val;
      left = left.replace(constants[i], rand_val);
      right = right.replace(constants[i], rand_val);
    }
    metaEq.constant_vals = constant_vals;
    return [left,right].join(" = ");
  }

  return ( <StaticMathField>{equation_string}</StaticMathField>)
}

function AnswerBox(props) {
  const [latex, setLatex] = useState("Answer")

  return(<EditableMathField
    latex={latex}
    onClick={() => setLatex("")}
    {...props}
    /> )
}

function QuizQuestion(props) {
  const [buttonVariant, setVariant] = useState("secondary");
  const [answer, setAnswer] = useState(null);
  const buttonRef = useRef(null)

  function regenerate(metaEq) {
    var [left, right] = [metaEq.LHS, metaEq.RHS]
    for (const [key, value] of Object.entries(metaEq.constant_vals)) {
      //console.log(`${key}: ${value}`);
      left = left.replace(key, value)
      right = right.replace(key, value)
    }
    return [left,right]
  }

  function check() {
      if (answer == null) {return;}
      console.log(props.metaEq.constant_vals);
      const [left,right] = regenerate(props.metaEq);
      console.log(left, right);
      const q = evaluatex(left);
      console.log(q,answer);
      console.log(evaluatex(answer,{}, { latex: true })());
      const out = q({"x":evaluatex(answer, { latex: true })()});
      if (out == right) {
        console.log("Hurrrahh!")
      }
      setVariant(((out == right) ? 'danger': 'success'))
      // new Promise(resolve => setTimeout(() => setVariant("secondary"), 3))
      console.log(out);
  }

  function fixButton() {
    buttonRef.current.blur()
    check()
  }

  return(
    <div style={{border: "2px solid black",borderRadius:"0.25rem", backgroundColor: "white"}}>
        <div style={{textAlign: "center", marginTop:"1%"}}>
        <h3>{props.header}</h3>
        <p>{props.description}</p>
        <Equation metaEq={props.metaEq}> </Equation>
        <br/>
        </div>
        <div  style={{textAlign: "center", marginTop:"6%",marginBottom:"2%"}}>
        <Center>
        <AnswerBox onChange={(e) => setAnswer(e.latex())}/>
        </Center>
        <Center>
        <Button style={{marginTop:"3%"}} variant={buttonVariant} ref={buttonRef} onClick={() => fixButton()}>
        </Button>
        </Center>
        </div>
    </div>
  )
}//userSelect={"text"}

function Quiz(props) {
  let testMetaEq = () => new MetaEq("Ax^2+Bx+C","D",["A","B","C","D"], [10,50,30,30])
  let testQuestion = (x) => new Question(`Q${x}`, "Solve the following quadratic", testMetaEq())
  let questions = [1,2,3].map(testQuestion);
  console.log(questions)
  // let questions = [{header:"Q1", description:"Solve the following quadratic", metaEq:testMetaEq()},{header:"Q2", metaEq:testMetaEq()},{header:"Q3", metaEq:testMetaEq()}]
  return(
  <Center>
  <div style={{marginTop: "2em" ,width: "30em", height: "15em"}}>
    <Carousel variant="dark" interval={null}>
    {questions.map(q => (
      <Carousel.Item>
      <QuizQuestion {...q}/>
      </Carousel.Item>
    ))}
    </Carousel>
  </div>
  </Center>
);

}


export default Quiz;
