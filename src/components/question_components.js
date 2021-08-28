import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Center from './Center.js';
import {addStyles, EditableMathField, StaticMathField} from 'react-mathquill';
import evaluatex from 'evaluatex/dist/evaluatex';

addStyles()



const variablesContext = React.createContext({
    x: 1
});

var Components = {};

const EditableMathExample = ({init, name}) => {
    const envContext = useContext(variablesContext);
    useEffect(()=>{
        envContext["set"+name.toUpperCase()](init);
    },[])
    return (
        <EditableMathField
          latex={envContext[name]}
          onChange={(mathField) => {
            envContext["set"+name.toUpperCase()](mathField.latex());
          }}
        />
    )
}

Components.MathField = EditableMathExample;

function WidthConstrainer({width, children}){
    return <div style={{width: width}}>
        {children}
    </div>
}

Components.WidthConstrainer = WidthConstrainer

function SidePanel({children}){
    return <div className="side-panel" style={{"backgroundColor": "#ddd"}}>
        {children}
    </div>
}

Components.SidePanel = SidePanel

function MainPanel({children}){
    return <div className="main-" style={{flex: "2"}}>
        {children}
    </div>
}

Components.MainPanel = MainPanel

function Question({children, defaultScale}){
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [c, setC] = useState(0);
    const [f, setF] = useState();
    const [g, setG] = useState();
    const [h, setH] = useState();

    const [f1, setF1] = useState();
    const [f2, setF2] = useState();
    const [f3, setF3] = useState();
    const [f4, setF4] = useState();
    const [f5, setF5] = useState();
    const [f6, setF6] = useState();
    const [f7, setF7] = useState();
    const [f8, setF8] = useState();
    const [f9, setF9] = useState();
    const [f10, setF10] = useState();
    const [scale, setScale] = useState(parseInt(defaultScale||"1") || 1);
    const [cx, setCX] = useState(300);
    const [cy, setCY] = useState(200);

    return <variablesContext.Provider value={{scale, setScale,cx,setCX,cy,setCY, a,b,c,f,g,h, setA, setB, setC, setF, setG, setH, f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,setF1,setF2,setF3,setF4,setF5,setF6,setF7,setF8,setF9,setF10}}>
            <Center>
            <div style={{width: "100%", "background-color": "#fff", "height": "100%", "display": "flex", "flex-direction": "row"}}>
            {children}
            </div>
        </Center>
    </variablesContext.Provider>
}

Components.Question = Question;

function Graph({children, width, height, center}){
const envContext = useContext(variablesContext);
const [mouseClickPos, setMouseClickPos] = useState([]);
const scale = envContext.scale;
useEffect(()=>{
    envContext.setCX(width/2);
    envContext.setCY(height/2);
},[])
return <div className='graph'>
    <input type="range" min="10" max="200" value={scale} onChange={(e)=>{envContext["setScale"](e.target.value)}} class="slider" id="myRange"/><br/>
    <svg width={width} onMouseDown={(e)=>{
        setMouseClickPos([[e.pageX,e.pageY], [envContext.cx, envContext.cy]]);
    }} onMouseMove={(e)=>{
        if (mouseClickPos[0]){
            const offset = [e.pageX-mouseClickPos[0][0], e.pageY-mouseClickPos[0][1]];
            envContext.setCX(mouseClickPos[1][0] + offset[0]);
            envContext.setCY(mouseClickPos[1][1] + offset[1]);
        }
    }}
    onMouseUp={(e)=>{
        setMouseClickPos([null, mouseClickPos[1]]);
    }}

    height={height}xmlns="http://www.w3.org/2000/svg">
    <defs>
        <pattern id="smallGrid" width={scale/5} height={scale/5} patternUnits="userSpaceOnUse">
            <path d={"M "+scale/5+" 0 L 0 0 0 "+scale/5} fill="none" stroke="gray" stroke-width="0.2"/>
        </pattern>
        <pattern patternTransform={"translate("+envContext.cx+" "+envContext.cy+")"}  id="grid" width={scale} height={scale} patternUnits="userSpaceOnUse">
            <rect width={scale} height={scale} fill="url(#smallGrid)"/>
            <path d={"M "+scale+" 0 L 0 0 0 "+scale} fill="none" stroke="black" stroke-width="0.5"/>
        </pattern>
    </defs>
    {children}
    <line x1="100%" y1={envContext.cy} x2="0%" y2={envContext.cy} fill="none" stroke="black" stroke-width="1"/>
    <line x1={envContext.cx} y1="100%" x2={envContext.cx} y2="0%" fill="none" stroke="black" stroke-width="1"/>
    <rect  width="50%" height="50%" fill="url(#grid)" />
    <rect width="50%" height="50%" fill="url(#grid)" x="50%" />
    <rect width="50%" height="50%" fill="url(#grid)" x="50%" y="50%"/>
    <rect width="50%" height="50%" fill="url(#grid)" y="50%" />
</svg>
</div>};

Components.Graph=Graph;

var inContext = (k, envContext)=>{
    return evaluatex(k)({e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c});
}

function Line({x1, y1, x2, y2}){
    try{
    const envContext = useContext(variablesContext);
    const cx=envContext.cx;
    const cy=envContext.cy;
    const s = parseFloat(envContext.scale);
    return <line x1={parseFloat(cx)+inContext(x1,envContext)*s} y1={parseFloat(cy)-inContext(y1,envContext)*s} x2={parseFloat(cx)+inContext(x2,envContext)*s} y2={parseFloat(cy)-inContext(y2,envContext)*s} stroke="black" stroke-width="2px"/>;
    }catch(e){
        return <p>{toString(e)}</p>
    }
};

Components.Line = Line

function FunctionLine({fName, f, width, color, resolution, begin}){
    const envContext = useContext(variablesContext);
    try{
    const cx=envContext.cx;
    const cy=envContext.cy;
    if (fName){
        f = envContext[fName];
    }
    if (width=="auto"){
        width=cx;
    }
    var e = parseFloat(width);
    var s = parseFloat(envContext.scale);
    var r = parseFloat(resolution);
    var b = parseFloat(begin || "0") || 0;
    var fn = evaluatex(f, {e: 2.718});
    return <>
        {<path d={"M"+(Array.from(Array((e*r)).keys()).map((i)=>{
            const m=(i/r+b);
            return parseFloat(cx)+(m*s) + "," + (parseFloat(cy)-(s*fn({x: m, e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c})))
            //return <circle key={i} cx={parseInt(cx)+(m*s)} cy={parseInt(cy)-(s*fn({x: m, e: 2.718}))} r="3" fill={color || "black"}/>;
        }).join(" "))+""} fill="none" stroke={color} stroke-width="3"/>};
    </>;
    }catch(exception){
        return <p>ERROR</p>
    }
}

Components.FunctionLine = FunctionLine;

function RiemannSquares({fName, f, width, color, squares, begin}){
    const envContext = useContext(variablesContext);
    try{
    const cx=envContext.cx;
    const cy=envContext.cy;
    if (fName){
        f = envContext[fName];
    }
    var e = parseFloat(width);
    var s = parseFloat(envContext.scale);
    var b = parseFloat(begin || "0") || 0;
    var fn = evaluatex(f, {e: 2.718});
    return <>
        {Array.from(Array(parseFloat(squares)).keys()).map((i)=>{
            const m=((i/squares * width)+b);
            var h=s*fn({x: m});
            if (h<0){
                return <rect width={(width/squares * s)-1} height={-h} x={parseFloat(cx) + s*m} y={parseFloat(cy)} style={{fill:color}}></rect>
            }
            return <rect width={(width/squares * s)-1} height={h} x={parseFloat(cx) + s*m} y={parseFloat(cy)-h} style={{fill:color}}></rect>
            })
        };
    </>;
    }catch(exception){
        return <p>ERROR</p>
    }
}

Components.RiemannSquares = RiemannSquares;

function FunctionDots({fName, f, width, color, resolution, begin}){
    const envContext = useContext(variablesContext);
    try{
        const cx=envContext.cx;
        const cy=envContext.cy;
    if (!f){
        f = envContext[fName];
    }
    var e = parseFloat(width);
    var s = parseFloat(envContext.scale);
    var r = parseFloat(resolution);
    var b = parseFloat(begin || "0") || 0;
    var fn = evaluatex(f);
    return <>
        {Array.from(Array(parseFloat(e*resolution*2)).keys()).map((i)=>{
            const m=(i+b)/r;
            return <circle key={i} cx={parseFloat(cx)+(m*s)} cy={parseFloat(cy)-(s*fn({x: m, e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c}))} r="3" fill={color || "black"}/>;
        })};
    </>;
    }catch(exception){
        return <p>ERROR</p>
    }
}

Components.FunctionDots = FunctionDots

Components.n = ()=><br/>;

Components.Latex = ({val})=><StaticMathField>{val}</StaticMathField>;

Components.h3 = function({children}){
    return <h3>{children}</h3>
}

Components.div = function({children}){
    return <div>{children}</div>
}

function ShowVar({val}){
    const variables = useContext(variablesContext);
    return <>{variables[val]}</>;
};

Components.ShowVar = ShowVar

function Incrementer({val}){
    const variables = useContext(variablesContext);
    return <button onClick={()=>{
        variables["set"+val.toUpperCase()](variables[val]+1)
    }}
    />;
};

Components.Incrementer = Incrementer


function VariableSlider({val, minValue, maxValue}){
    const variables = useContext(variablesContext);
    maxValue = (parseFloat(maxValue));
    if (!maxValue){
        maxValue = 1;
    };
    minValue = parseFloat(minValue);
    if (!minValue){
        minValue = 0;
    };
    return <div class="slidecontainer">
        <input type="range" min="0" max="1000" value={(variables[val]-minValue)*1000/(maxValue-minValue)} onChange={(e)=>{
            variables["set"+val.toUpperCase()](e.target.value/1000*(maxValue-minValue)+minValue);
        }} class="slider" id="myRange"/>
    </div>;
}

Components.VariableSlider = VariableSlider

function DotObject({x, y, color}){
    const envContext = useContext(variablesContext);
    const cx=envContext.cx;
    const cy=envContext.cy;
    try{
    var s = parseFloat(envContext.scale);
    var fx = evaluatex(x)({e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c});
    var fy = evaluatex(y)({e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c});
    return <circle cx={parseFloat(cx)+s*fx} cy={parseFloat(cy)-s*fy} r="3" fill={color || "black"}/>;
    }catch(e){
        return <p>{toString(e)}</p>
    }
}

Components.DotObject = DotObject

function ImageObject({x, y, imageUrl, height, width}){
    const envContext = useContext(variablesContext);
    const cx=envContext.cx;
    const cy=envContext.cy;
    try{
    var s = parseFloat(envContext.scale);
    var fx = evaluatex(x)({e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c});
    var fy = evaluatex(y)({e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c});
    return <image href={imageUrl} x={parseFloat(cx)+s*fx-width/2} y={parseFloat(cy)-s*fy-height/2} height={height} width={width}/>;
    }catch(e){
        return <p>{toString(e)}</p>
    }
}

Components.ImageObject = ImageObject

function TextObject({x, y, txt}){
    const envContext = useContext(variablesContext);
    const cx=envContext.cx;
    const cy=envContext.cy;
    try{
    var s = parseFloat(envContext.scale);
    var fx = evaluatex(x)({e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c});
    var fy = evaluatex(y)({e: 2.718, a:envContext.a, b:envContext.b, c:envContext.c});
    return <text x={parseFloat(cx)+s*fx} y={parseFloat(cy)-s*fy}>{txt}</text>;
    }catch(e){
        return <p>{toString(e)}</p>
    }
}

Components.TextObject = TextObject

function TimeTicker({val, rate}){
    const variables = useContext(variablesContext);
    rate = parseFloat(rate);
    useEffect(()=>{
        setTimeout(()=>{
            var newVal = variables[val]+(rate/10);
            variables["set"+val.toUpperCase()](newVal);
        }, 100)
    })
    return <>

    </>
}
Components.TimeTicker = TimeTicker

function Title({children}){
    return <><br/><p style={{width: "100%", "font-weight": "bold", textAlign: "center", "font-size": "20px"}}>{children}</p></>
}
Components.Title = Title

Components.SuperContainer=({children})=><>{children}</>

export default Components;
