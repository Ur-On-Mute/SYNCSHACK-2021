import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {Button, Form, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import evaluatex from 'evaluatex/dist/evaluatex';
import Center from './Center.js';
import {EditableMathField, StaticMathField} from 'react-mathquill'
import Slides from './Slides.js'

function asyncTime(func, time) {
  new Promise(resolve => {setTimeout(() => func(), time)})
}

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
  constructor(header, description, metaEq, answers_count) {
    this.header = header;
    this.description = description;
    this.metaEq = metaEq;
    this.answers_count = answers_count;
  }
}

function Equation(props){
  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max-min));
  }
  const [equation_string, setEq] = useState();

  useEffect(() => {
    setEq(generate(props.metaEq));
  }, [props.metaEq])

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
  const answerButtonRef = useRef(null)
  const addAnswerRef = useRef(null)
  const [metaEq, setMetaEq] = useState(props.metaEq);
  let answers = []
  const [answersAmount, setAmount] = useState(1);

  function minusAnswer() {
    if (addAnswerRef == null) {return;}
    if (answersAmount-1 > 0){
      setAmount(answersAmount-1)
    }
  }

  function addAnswer() {
    if (addAnswerRef == null) {return;}
    if (answersAmount+1 < 10){
      setAmount(answersAmount+1)
    }
  }


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
      if (answer == null || metaEq == null) {return;}
      console.log(metaEq.constant_vals);
      const [left,right] = regenerate(metaEq);
      console.log(left, right);
      var out;
      try {
        const q = evaluatex(left);
        const i = evaluatex(answer,{}, { latex: true })()
        console.log(q,answer);
        console.log(i);
        out = q({"x":i});
        console.log(out);
      }
      catch (error) {
        console.error(error);
        setVariant("warning")
      }
      if (out == null) {
        setVariant("warning")
      }
      else {
        var correct = (Number(out.toFixed(3)) == right)
        setVariant(correct?'success':'danger')
        asyncTime(() => props.push(correct), 400)
      }
      asyncTime(() => setVariant("secondary"), 300)

      // props.push(correct);
      // new Promise(resolve => {setTimeout(() => setVariant("secondary"), 300)})
  }

  function fixButton(buttonRef) {
    if (buttonRef==null) {return;}
    buttonRef.current.blur()
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
        <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup>
        <Button style={{marginRight:'5%'}} size="lg" variant={"success"} onClick={() => {fixButton();addAnswer();}}></Button>
        <Center>
        {[...Array(Math.max(1,answersAmount)).keys()].map(() =>
          <AnswerBox onChange={(e) => setAnswer(e.latex())}/>
        )}
        </Center>
        <Button style={{marginLeft:'5%'}} size="lg" variant={"danger"} onClick={() => {fixButton();minusAnswer()}}></Button>
        </ButtonGroup>
        </ButtonToolbar>
        </Center>
        <Center>

        <Button style={{marginTop:"3%"}} size="lg" variant={buttonVariant} ref={answerButtonRef} onClick={() => {fixButton(answerButtonRef);check();}}>
        </Button>
        </Center>
        </div>
    </div>
  )
}//<Button style={{marginTop:"3%"}} variant={buttonVariant} ref={buttonRef} onClick={() => props.push()}>{"tester"}</Button>

function Quiz(props) {
  let testMetaEq = () => new MetaEq("Ax^2+Bx+C","D",["A","B","C","D"], [10,50,30,30])
  let testQuestion = (x) => new Question(`Q${x}`, "Solve the following quadratic", testMetaEq(), 2)
  let questions = [1,2,3].map(testQuestion);
  const [current, setCurrent] = useState(0);
  console.log(questions);
  function push(correct) {
    if (!correct) {
      const redoQuestion = questions[current];
      redoQuestion.metaEq.constant_vals = null;
      questions.push(redoQuestion);
    }
    questions.splice(current,1)
    setCurrent(current+1);
    if (current >= questions.length-1) {
      setCurrent(0)
    }
  }
  return(
  <div style={{marginBottom: "2em"}}>
  <Center height="15em">
  <div style={{marginTop: "2em" ,width: "30em", height: "15em"}}>
    <Slides width="30em" height="15em" total={questions.length} current={current}>
    {questions.map(q => (
      <QuizQuestion {...q} push={push}/>
    ))}
    </Slides>
  </div>
  </Center>
  </div>
);

}


export default Quiz;
