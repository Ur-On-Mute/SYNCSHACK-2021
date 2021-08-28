import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState, useRef} from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validate, parse } from 'fast-xml-parser';
import reactDom from 'react-dom';
import question_components from './question_components.js';

const parser = new DOMParser();

function processChildren (children, variable_values, set_variable_values) {
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
          ...attributes,
          variable_values: variable_values,
          set_variable_values: set_variable_values,
          key: i
        }, processChildren(node.childNodes, variable_values, set_variable_values));
      }else{
        return <p style={{color: "red"}}>invalid component "{node.nodeName}"</p>
      }
    });
}

function App() {
  const [XML, setXML] = useState(`
    <XMLText class="yeah-attributes">
      regular text
      another texta
    </XMLText>
  `);
  const xmlDoc = parser.parseFromString(XML, 'text/xml');
  const onXMLUpdate = (e)=>{
    const val = e.target.value;
    setXML(val);
  };
  var [variable_values, set_variable_values] = useState({});
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <hr/><hr/>
        <div class="flex-container" style={{"flex-direction": "row", "display": "flex", width: "80%", height: "100%"}}>
          <br/>
          <textarea onChange={onXMLUpdate} style={{flex:1, height: "400px"}} wrap="soft"/>
          <div style={{flex:1}}>
            {
              processChildren(Array.from(xmlDoc.childNodes), variable_values, set_variable_values)
            }
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;