import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import question_components from './question_components.js';
import ReactPrismEditor from "react-prism-editor";

const parser = new DOMParser();

function processChildren (children, passthroughattributes) {
  return Array.from(children.length ? children : []).map(
    (node, i) => {
      // return if text node
      if (node.nodeType === 3) return node.nodeValue;

      // collect all attributes
      if (node.attributes){
        let attributes = Array.from(node.attributes).reduce((attrs, attr) => {
          attrs[attr.name] = attr.value;
          return attrs;
        }, {});

        // create React component
        if (question_components[node.nodeName]!=null) {
          return React.createElement(question_components[node.nodeName], {
            ...passthroughattributes,
            ...attributes,
            key: i
          }, processChildren(node.childNodes,{
            scale: attributes.scale, 
            cy: (attributes.height || 0)/2,
            cx: (attributes.width || 0)/2,
          }));
        }else{
          //return <p style={{color: "red"}}>invalid component "{node.nodeName}"</p>
          return;
        }
    }
    });
}

function SigmaMathRenderer({XML}){
  const xmlDoc = parser.parseFromString(XML, 'text/xml');
  return <>
          {
            processChildren(Array.from(xmlDoc.childNodes), {})
          }
    </>
}

function WYSIWYGEditor({questionBody, setQuestionBody}) {
  return (
    <div className="App">
      <header className="App-header" style={{width: "100%"}}>
        <hr/><hr/>
        <div class="flex-container" style={{"flex-direction": "column", "display": "flex", width: "100%", height: "100%"}}>
          <br/>
          <div style={{flex:1, width: "100%", height: "300px", overflow: "visible"}}>
            <div style={{width:"100%", height: "300px", overflow: "scroll"}}>
          <ReactPrismEditor
            language={"xml"}
            theme={"tomorrow"}
            code={questionBody}
            clipboard={true}
            changeCode={code => {
              setQuestionBody(code)
            }}
          />
          </div><br/>
          </div>
          <div className="math-renderer" style={{flex:2}}>
            <SigmaMathRenderer XML={questionBody}/>
          </div>
        </div>
      </header>
    </div>
  );
}

export {
  WYSIWYGEditor,
  SigmaMathRenderer,
};
