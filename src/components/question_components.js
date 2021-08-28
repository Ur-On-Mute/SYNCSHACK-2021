import React, { useEffect } from 'react';
import { useState } from 'react';

var components = {};

function QuestionScope({variables, children, variable_values, set_variable_values}){
    useEffect(()=>{
        if (variables){
            variables.split(',').forEach((val)=>{
                if (!variable_values[val]){
                    variable_values[val] = 0;
                }
            })
        }
        set_variable_values(variable_values);
    })
    if (!variables){
        return <p>...</p>
    };
    var variable_names = variables.split(",")
    return <div>
        {children}
    </div>
}
components.QuestionScope = QuestionScope;

components.h3 = function({children}){
    return <h3>{children}</h3>
}
components.div = function({children}){
    return <div>{children}</div>
}

components.variable_display = function({variable_values, val}){
    return <>
        {variable_values[val]}
    </>
}

components.incrementer = function({variable_values, val, set_variable_values, bigDiv}){
    return <input type="button" onClick={()=>{
        variable_values[val]++;
        set_variable_values(variable_values);
    }}/>
}

components.input = function({variable_values, val, set_variable_values, bigDiv}){
    return <input type="number" onChange={(e)=>{
        variable_values[val] = e.target.value;
        set_variable_values(variable_values);
    }}/>
}

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