import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {Button, Form} from 'react-bootstrap';
import evaluatex from 'evaluatex/dist/evaluatex';
import Center from './Center.js';

class MetaEq {
  constructor(left, right, constants) {
    this.LHS = left;
    this.RHS = right;
    this.constants = constants;
    this.constant_vals = null
  }
}

class Question {
  constructor(equation, metaEq) {
    this.header = header;
    this.metaEq = metaEq;
  }
}

function Equation(props){
  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max-min));
  }

  function generate(metaEq) {
    if (metaEq == null) {return;}
    var left = metaEq.LHS;
    var right = metaEq.RHS;
    var constants = metaEq.constants;
    var constant_vals = {};
    for (var i = 0; i < constants.length; i++) {
      const rand_val = getRandomInt(0, 100);
      constant_vals[constants[i]] = rand_val;
      left = left.replace(constants[i], rand_val);
      right = right.replace(constants[i], rand_val);
    }
    metaEq.constants_vals = constant_vals;
    return [left,right].join(" = ");
  }
  return (<p>{generate(props.metaEq)}</p>)
}

function AnswerBox() {
  return(<Form.Control
          type="text"
          placeholder="Input answer"
          aria-label="Input answer"
          width={0.25}
          />)
}

function QuizQuestion(props) {
  const answerRef = useRef(null);
  function check() {

  }

  return(
    <div>
        <h3>{props.header}</h3>
        <Equation metaEq={props.metaEq}> </Equation>
        <AnswerBox ref={answerRef}/>
        <Center>
        <Button variant="secondary" onClick={check()}>
        </Button>
        </Center>
    </div>
  )
}

function Quiz(props) {
  let testMetaEq = new MetaEq("Ax^2+Bx+C","D",["A","B","C","D"])
  let questions = [{header:"Q1", metaEq:testMetaEq},{header:"Q2", metaEq:testMetaEq},{header:"Q3", metaEq:testMetaEq}]
  return(
  <div style={{marginTop: "2em" ,width: "30em", height: "15em", backgroundColor: "grey"}}>
    <Carousel variant="dark" interval={null}>
    {questions.map(q => (
      <Carousel.Item>
      <QuizQuestion header={q.header} metaEq={q.metaEq}/>
      </Carousel.Item>
    ))}
    </Carousel>
  </div>
);

}


export default Quiz;
