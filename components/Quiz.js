import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap';
// import { StaticMathField } from 'react-mathquill'

class MetaEq {
  constructor(equation, constants) {
    this.equation = equation;
    this.constants = constants;
  }
}
// //
// const sMF = dynamic(() => {
//   return(<StaticMathField latex={"1+1"}> </StaticMathField>)
// },{ ssr: false })

function Equation(props){
  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max-min));
  }

  function generate(metaEq) {
    if (metaEq == null) {return;}
    var equation = metaEq.equation;
    var constants = metaEq.constants;
    for (var i = 0; i < constants.length; i++) {
      equation = equation.replace(constants[i], getRandomInt(0, 100))
    }
    return equation;
  }
  return (<p>{generate(props.metaEq)}</p>)
}


function Quiz(props) {

  let testMetaEq = new MetaEq("Ax^2+Bx+C",["A","B","C"])

  return(
  <div style={{marginTop: "2em" ,width: "30em", height: "15em", backgroundColor: "grey"}}>
  <Carousel variant="dark" interval={null}>
  <Carousel.Item>
    <h3>Question 1</h3>
    <Equation metaEq={testMetaEq}> </Equation>
  </Carousel.Item>
  <Carousel.Item>
    <h3>Question 2</h3>
    <Equation metaEq={testMetaEq}> </Equation>
  </Carousel.Item>
  <Carousel.Item>
    <h3>Question 3</h3>
    <Equation metaEq={testMetaEq}> </Equation>
  </Carousel.Item>
</Carousel>
</div>
);

}


export default Quiz;
