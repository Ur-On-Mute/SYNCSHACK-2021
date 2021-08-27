import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap';

function Quiz(props) {
//test

  return(
  <div>
    <Carousel className="">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/assets/t1"
      alt="First slide"
      width="25em"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/assets/t2"
      alt="Second slide"
      width="25em"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/assets/t3"
      alt="Third slide"
      width="25em"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>
);

}


export default Quiz;
