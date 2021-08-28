import React from 'react';
import {useState, useRef} from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validate, parse } from 'fast-xml-parser';
import reactDom from 'react-dom';
import question_components from './question_components.js';
import { Link, withRouter } from 'react-router-dom';

const parser = new DOMParser();

function processChildren (children, passthroughattributes, superState, setSuperState) {
  return Array.from(children.length ? children : []).map(
    (node, i) => {
      // return if text node
      if (node.nodeType === 3) return node.nodeValue;

      // collect all attributes
      let attributes = Array.from(node.attributes).reduce((attrs, attr) => {
        attrs[attr.name] = attr.value;
        return attrs;
      }, {});

      // create React component
      if (question_components[node.nodeName]!=null) {
        return React.createElement(question_components[node.nodeName], {
          ...passthroughattributes,
          ...attributes,
          superState: superState,
          setSuperState: setSuperState,
          key: i
        }, processChildren(node.childNodes,{
          scale: attributes.scale, 
          cy: (attributes.height || 0)/2,
          cx: (attributes.width || 0)/2,
        }, superState, setSuperState));
      }else{
        return <p style={{color: "red"}}>invalid component "{node.nodeName}"</p>
      }
    });
}

function App() {
  const [XML, setXML] = useState(`
  <Question>

  </Question>
  `);
  const xmlDoc = parser.parseFromString(XML, 'text/xml');
  const onXMLUpdate = (e)=>{
    const val = e.target.value;
    setXML(val);
  };
  const [superState, setSuperState] = useState({m: 7});
  return (
    <div className="App">
      <header className="App-header">
        <hr/><hr/>
        <div class="flex-container" style={{"flex-direction": "row", "display": "flex", width: "80em", height: "100%"}}>
          <br/>
          <textarea value={XML} onChange={onXMLUpdate} style={{flex:1, height: "400px"}} wrap="soft"/>
          <div style={{flex:2}}>
            {
              processChildren(Array.from(xmlDoc.childNodes), {}, superState, setSuperState)
            }
          </div>
        </div>
      </header>
    </div>
  );
}

export default withRouter(App);
