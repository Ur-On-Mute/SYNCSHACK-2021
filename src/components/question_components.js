import React, { useEffect } from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Center from './Center.js';
import {addStyles, EditableMathField, StaticMathField} from 'react-mathquill';
import evaluatex from 'evaluatex/dist/evaluatex';

addStyles()

var components = {};

const EditableMathExample = ({init}) => {
    const [latex, setLatex] = useState(init)
  
    return (
        <EditableMathField
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex())
          }}
        />
    )
  }

components.MathField = EditableMathExample;

function Question({children}){
    return <Center>
        <div style={{width: "100%", "background-color": "#fff", "height": "100%"}}>
        {children}
        </div>
    </Center>
}
components.Question = Question;

components.Graph = ({children, width, height, scale, center})=><svg width={width} height={height}xmlns="http://www.w3.org/2000/svg">
    <defs>
        <pattern id="smallGrid" width={scale/2.5} height={scale/2.5} patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="0.1"/>
        </pattern>
        <pattern id="grid" width={scale*2} height={scale*2} patternUnits="userSpaceOnUse">
            <rect width={scale*2} height={scale*2} fill="url(#smallGrid)"/>
            <path d={"M "+scale*2+" 0 L 0 0 0 "+scale*2} fill="none" stroke="gray" stroke-width="0.5"/>
        </pattern>
    </defs>
    {children}
    <line x1="100%" y1="50%" x2="0%" y2="50%" fill="none" stroke="black" stroke-width="1"/>
    <line x1="50%" y1="100%" x2="50%" y2="0%" fill="none" stroke="black" stroke-width="1"/>
    <rect width="50%" height="50%" fill="url(#grid)" />
    <rect width="50%" height="50%" fill="url(#grid)" x="50%" />
    <rect width="50%" height="50%" fill="url(#grid)" x="50%" y="50%"/>
    <rect width="50%" height="50%" fill="url(#grid)" y="50%" />
</svg>;

components.Line = ({x1, y1, x2, y2})=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black"></line>;

components.FunctionLine = ({f, scale, elements, variables})=>{
    <p>{variables.m}</p>
    var e = parseInt(elements);
    var s = parseInt(scale);
    var fn = evaluatex(f);
    var list = Array.from(Array(parseInt(elements)).keys()).map((i)=>{
        return (i/e*s + "," + (200-fn({x: i/s})));
    });
    return <path d={"M0,0 C"+list.join(" ")} fill="none" stroke="black"/>
};

components.FunctionDots = ({f, scale, width, cx, cy, color, resolution, begin})=>{
    try{
    cx = cx || 0;
    cy = cy || 0;
    var e = parseInt(width);
    var s = parseInt(scale);
    var r = parseInt(resolution);
    var b = parseInt(begin || "0") || 0;
    var fn = evaluatex(f);
    return <>
        {Array.from(Array(parseInt(e*resolution*2)).keys()).map((i)=>{
            const m=(i+b)/r;
            return <circle key={i} cx={parseInt(cx)+(m*s)} cy={parseInt(cy)-(s*fn({x: m, e: 2.718}))} r="3" fill={color || "black"}/>;
        })};
    </>;
    }catch(exception){
        return <p>ERROR</p>
    }
}

components.n = ()=><br/>;

components.Latex = ({val})=><StaticMathField>{val}</StaticMathField>;

components.h3 = function({children}){
    return <h3>{children}</h3>
}
components.div = function({children}){
    return <div>{children}</div>
}

components.ShowVar = function({val, superState}){
    <p>{superState[val]}</p>;
};

export default components;
/*
{
    'QuestionScope': ()=>{

    }
    ,

    /*'XMLText': ({className, children})=><div className={className}>{children}</div>,
    "Container": ({color, children})=><div style={{"background-color": color}}>{children}</div>,
    "input": ({children})=><input>{children}</input>,
    "Circle": ({x, y, r, children})=><svg>
        <circle cx={parseInt(x)} cy={parseInt(y)} r={parseInt(r)}>{children}</circle>
    </svg>,
    "parsererror": ({className, children})=><div className={className}>{children}</div>,
    "div": ({color, children})=><div style={{"background-color": color}}>{children}</div>,
    "h3": h3
  };*/