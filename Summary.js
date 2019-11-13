import React from "react";

const summary = props => {
  return (
    <div id="summary">
    
      <div className="row">
        <div className="col-lg-10 col-lg-offset-1">
          <div id="summaryQuestion">
            <h4>Question {props.number}</h4>
            <p>{props.question}</p>
          </div>
          <div id="summaryAnswer">
            <p>{props.valueProvided}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default summary;
