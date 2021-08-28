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

function AnswerBox(props) {
  const [latex, setLatex] = useState("Answer")

  return(<EditableMathField
    latex={latex}
    onClick={() => setLatex("")}
    {...props}
    /> )
}

function Equation(props){
  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max-min));
  }
  const [equation, setEq] = useState([props.LHS, props.RHS]);
  const [answers, setAnswers] = useState();
  // const [props, setprops] = useState({props.LHS});
  const [constantVals, setConstantVals] = useState(props.constantVals);

  useEffect(() => setAnswers(props.answers), [props.answers])
  useEffect(() => setConstantVals(props.constantVals), [props.constantVals])

  useEffect(() => {
    console.log(equation)
    console.log([props.LHS, props.RHS])
    const [left, right] = equation
    if (left == props.LHS && right == props.RHS) {
      setEq(generate());
    }
  }, [])
  //
  useEffect(() => {
    if (props.check) {
      check();
      props.setCheck(false);
    }
  }, [props.check])

  function generate() {
    if (props == null) {return;}
    console.log("generate", props)
    var left = props.LHS;
    var right = props.RHS;
    const constants = props.constants;
    const constant_ranges = props.constant_ranges;
    var newConstantVals = {};
    for (var i = 0; i < constants.length; i++) {
      const rand_val = getRandomInt(0, constant_ranges[i]);
      newConstantVals[constants[i]] = rand_val;
      left = left.replace(constants[i], rand_val);
      right = right.replace(constants[i], rand_val);
    }
    props.setConstantVals(newConstantVals);
    return [left,right];
  }

  function check() {
      if (answers == null || props == null || answers.length == 0) {return;}
      console.log(props.constant_vals);
      const [left,right] = equation;
      console.log(left, right);
      var out = [];
      try {
        const q = evaluatex(left);
        answers.forEach((a) => {
          const i = evaluatex(a,{}, { latex: true })()
          out.push(q({"x":i}));
        });
      }
      catch (error) {
        console.error(error);
        props.setVariant("warning")
      }
      if (out == null) {
        props.setVariant("warning")
      }
      else {
        console.log("answers", answers, answers.length)
        var correct = true;
        if (answers.length < props.answers_count) {
            console.log(props.answers_count)
            correct = false;
        }
        else {
          for (var o=0; o<out.length; o++) {
            console.log(Number(out[o].toFixed(3)))
            if (Number(out[o].toFixed(3)) != right) {
              correct = false;
            }
          }
        }
        props.setVariant(correct?'success':'danger')
        asyncTime(() => props.push(correct), 400)
      }
      asyncTime(() => props.setVariant("secondary"), 300)
  }

  return ( <StaticMathField>{equation!=null?equation.join(" = "):"None"}</StaticMathField>)
}

function QuizQuestion(props) {
  // const [buttonVariant, setVariant] = useState("secondary");

  const answerButtonRef = useRef(null)
  const addAnswerRef = useRef(null)
  const [answers, setAnswer] = [props.answers, props.setAnswer]
  const [answersAmount, setAmount] = useState(1);

  const check = () => {
    props.setCheck(true)
  }

  // useEffect(() => {
  //   setMetaEq(props.metaEq);
  // }, [props.metaEq])

  function minusAnswer() {
    if (addAnswerRef == null) {return;}
    if (answersAmount-1 > 0){
      setAmount(answersAmount-1)
      var n_answers = answers
      n_answers.pop()
      setAnswer(n_answers)
    }
  }

  function addAnswer() {
    if (addAnswerRef == null) {return;}
    if (answersAmount+1 < 10){
      setAmount(answersAmount+1)
    }
  }

  function changeAnswer(n, latex) {
    let n_answers = answers;
    n_answers.splice(n,1,latex);
    n_answers[n] = latex;
    setAnswer(n_answers)
    console.log(answers)
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
        {props.children}
        <br/>
        </div>
        <div  style={{textAlign: "center", marginTop:"6%",marginBottom:"2%"}}>
        <Center>
        <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup>
        <Button style={{marginRight:'5%'}} size="lg" variant={"success"} onClick={() => {fixButton();addAnswer();}}></Button>
        <Center>
        {[...Array(Math.max(1,answersAmount)).keys()].map((n) =>
          <AnswerBox onChange={(e) => changeAnswer(n, e.latex())}/>
        )}
        </Center>
        <Button style={{marginLeft:'5%'}} size="lg" variant={"danger"} onClick={() => {fixButton();minusAnswer()}}></Button>
        </ButtonGroup>
        </ButtonToolbar>
        </Center>
        <Center>

        <Button style={{marginTop:"3%"}} size="lg" variant={props.buttonVariant} ref={answerButtonRef} onClick={() => {fixButton(answerButtonRef);check();}}>
        </Button>
        </Center>
        </div>
    </div>
  )
}//

function AlgebraQuestionWrapper(props) {
  return(
    <QuizQuestion
      header={props.header}
      description={props.description}
      check={props.check}
      setCheck={props.setCheck}
      answers={props.answers}
      setAnswer={props.setAnswer}
      correctAnswers={props.correctAnswers}
      answers_count={props.answers_count}
      buttonVariant={props.buttonVariant}
      >
      <Equation
        LHS={props.LHS}
        RHS={props.RHS}
        constants={props.constants}
        constant_ranges={props.constant_ranges}
        answers={props.answers}
        check={props.check}
        setCheck={props.setCheck}
        push={props.push}
        constantVals={props.constantVals}
        setConstantVals={props.setConstantVals}
        setVariant={props.setVariant}>
      </Equation>
    </QuizQuestion>
  )
}

function Quiz(props) {
  let testMetaEq = () => new MetaEq("Ax^2+Bx+C","D",["A","B","C","D"], [10,50,30,30])
  // let testMetaEq = () => new MetaEq("Ax","B",["A","B"], [10,50,10])
  let testQuestion = (x) => new Question(`Q${x}`, "Solve the following quadratic", testMetaEq(), 2)
  const [questions, setQuestions] = useState([1,2,3].map(testQuestion));
  const [current, setCurrent] = useState(0);
  const [correctAnswers, setCorrect] = useState(0);
  const [constantVals, setConstantVals] = useState(null);
  const [answers, setAnswer] = useState([]);
  const [check, setCheck] = useState(false);
  const [buttonVariant, setVariant] = useState("secondary");

  console.log(questions);
  function push(correct) {
    let newQuestions = questions;
    if (!correct) {
      const redoQuestion = questions[current];
      const {constant_vals, ...rest} = questions[current].metaEq
      redoQuestion.metaEq = new MetaEq(...Object.values(rest));
      console.log(redoQuestion);
      newQuestions.push(redoQuestion);
    }
    else {
      setCorrect(correctAnswers+1);
    }
    newQuestions.splice(current,1);
    setQuestions(newQuestions);
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
      {props.children}
    </Slides>
    <p style={{textAlign: "center"}}>{correctAnswers}</p>
  </div>
  </Center>
  <br/>
  </div>
);

function QuizWrapper(props) {
  return (
    <Quiz>
      {React.Children.map(props.children, (c) => {
        <AlgebraQuestionWrapper
          header={c.header} description={c.description}  answers_count={c.answers_count}
          LHS={c.LHS} RHS={c.RHS} constants={c.constants} constant_ranges={c.constant_range}
          check={check} setCheck={setCheck} answers={answers} setAnswer={setAnswer} correctAnswers={correctAnswers} push={push} constantVals={constantVals} setConstantVals={setConstantVals} buttonVariant={buttonVariant} setVariant={setVariant}
        />
      })}
      {props.children}
    </Quiz>
  )
}

// <QuizQuestion header="Q3" description="Solve the following quadratic"  correctAnswers={correctAnswers} answers_count={2}>
//   <Equation metaEq={new MetaEq("Ax^2+Bx+C","D",["A","B","C","D"], [10,50,30,30])} push={push} constantVals={constantVals} setConstantVals={setConstantVals}> </Equation>
// </QuizQuestion>

}

// <QuizQuestion
//   header="Q1"
//   description="Solve the following quadratic"
//   check={check}
//   setCheck={setCheck}
//   answers={answers}
//   setAnswer={setAnswer}
//   correctAnswers={correctAnswers}
//   answers_count={2}
//   buttonVariant={buttonVariant}
//   >
//   <Equation
//     metaEq={new MetaEq("Ax^2+Bx+C","D",["A","B","C","D"], [10,50,30,30])}
//     LHS={"Ax^2+Bx+C"}
//     RHS={"D"}
//     constants={["A","B","C","D"]}
//     constant_ranges={[10,50,30,30]}
//     answers={answers}
//     check={check}
//     setCheck={setCheck}
//     push={push}
//     constantVals={constantVals}
//     setConstantVals={setConstantVals}
//     setVariant={setVariant}>
//   </Equation>
// </QuizQuestion>


export {Quiz, AlgebraQuestionWrapper};
