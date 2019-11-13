import React, { Component } from "react";
import data from "../data/data";
import "../App.css";
import Summary from "./Summary";
import "bootstrap";
import firstImage from "../Images/1.png";
import secondImage from "../Images/2.png";
import thirdImage from "../Images/3.png";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nr: 0,
      total: data.length,
      showButton: true,
      inputVal: "",
      randomImageLink: "",
      allImages: [
        { photo: firstImage },
        { photo: secondImage },
        { photo: thirdImage }
      ],
      showPrevious: false,
      isPrevious: false,
      finalValues: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.resetClick = this.resetClick.bind(this);
  }
  pushData(nr) {
    let randomImage = Math.floor(Math.random() * this.state.allImages.length);
    let imageLink = this.state.allImages[randomImage].photo;
    let updatedData = "";
    if (this.state.finalValues.length > nr && nr != 0 && nr != 2) {
      let array = [...this.state.finalValues];
      updatedData = array[nr].valueProvided;
    } else {
      updatedData = "";
    }
    this.setState({
      question: data[nr].question,
      nr: this.state.nr + 1,
      providedAnswer: updatedData,
      randomImageLink: imageLink
    });
  }

  componentWillMount() {
    //let { nr } = this.state;
    this.pushData(this.state.nr);
  }
  handleChange(e) {
    this.setState({
      showButton: true,
      providedAnswer: e.target.value
      //finalValues:[...this.state.finalValues, {question:this.state.question, valueProvided:e.target.value}]
      ///[this.state.question]:e.target.value,
      //finalValues:[...this.state.finalValues, {[this.state.question]:e.target.value} ]
      //finalValues:[...this.state.finalValues, {question:this.state.question, valueProvided:e.target.value}]
    });
  }

  resetClick() {
    let randomImage = Math.floor(Math.random() * this.state.allImages.length);
    let imageLink = this.state.allImages[randomImage].photo;
    this.setState({
      question: data[0].question,
      nr: 1,
      randomImageLink: imageLink,
      finalValues: [],
      showButton: true,
      displaySummary: false,
      showPrevious: false
    });
  }

  previousQuestion() {
    let { nr, total, score } = this.state;
    let randomImage = Math.floor(Math.random() * this.state.allImages.length);
    let imageLink = this.state.allImages[randomImage].photo;
    if (nr === 2) {
      this.setState({
        question: this.state.finalValues[nr - 2].question,
        providedAnswer: this.state.finalValues[nr - 2].valueProvided,
        randomImageLink: imageLink,
        displaySummary: false,
        nr: nr - 1,
        isPrevious: true,
        showButton: true,
        showPrevious: false
      });
    } else {
      this.setState({
        question: this.state.finalValues[nr - 2].question,
        providedAnswer: this.state.finalValues[nr - 2].valueProvided,
        randomImageLink: imageLink,
        isPrevious: true,
        displaySummary: false,
        nr: nr - 1,
        showButton: true,
        showPrevious: true
      });
    }
  }

  nextQuestion() {
    let { nr, total, score } = this.state;
    let randomImage = Math.floor(Math.random() * this.state.allImages.length);
    let imageLink = this.state.allImages[randomImage].photo;

    if (this.state.finalValues.length >= nr) {
      let array = [...this.state.finalValues];
      const index = nr - 1;
      let providedAnswer = "";

      if(this.state.finalValues.length == nr){
        this.setState({
            showButton: true
        })
      }
      if (array[index].valueProvided != this.state.providedAnswer) {
        array[index].valueProvided = this.state.providedAnswer
        this.pushData(nr);
        this.setState({
          finalValues: array,
          showPrevious: true,
          isPrevious: false
        });
      }
      else{
        this.pushData(nr);
        this.setState({
            showPrevious: true,
            isPrevious: false
        });
      }
    }
    // if (this.state.isPrevious) {
    //   let array = [...this.state.finalValues];
    //   const index = nr - 1;
    //   array[index].valueProvided = this.state.providedAnswer;
    //   this.pushData(nr);
    //   this.setState({
    //     finalValues: array,
    //     isPrevious: false
    //   });
    // }
    // else if(this.state.finalValues.length >= nr){
    //     let array = [...this.state.finalValues];
    //     const index = nr;
    //     this.setState({
    //         question: array[nr].question,
    //         providedAnswer: array[nr].valueProvided
    //     })
    // }
    else if (nr === total) {
      this.setState({
        finalValues: [
          ...this.state.finalValues,
          {
            question: this.state.question,
            valueProvided: this.state.providedAnswer
          }
        ],
        providedAnswer: "",
        randomImageLink: imageLink,
        displaySummary: true,
        isPrevious: false,
        showPrevious: true
      });
    } else {
      this.pushData(nr);
      this.setState({
        showButton: true,
        finalValues: [
          ...this.state.finalValues,
          {
            question: this.state.question,
            valueProvided: this.state.providedAnswer
          }
        ],
        providedAnswer: "",
        randomImageLink: imageLink,
        isPrevious: false,
        showPrevious: true
      });
    }
  }
  render() {
    let {
      nr,
      total,
      question,
      displaySummary,
      showButton,
      showPrevious
    } = this.state;

    let summary = null;
    let questionnaire = null;
    if (this.state.displaySummary) {
      summary = (
        <div>
          {this.state.finalValues.map((questionnaire, index) => {
            // return (<div className="row">
            //     <div className="col-lg-10 col-lg-offset-1">
            //         <div id="question">
            //             <h4>Question {index + 1}</h4>
            //             <p>{questionnaire.question}</p>
            //         </div>
            //         <div id="answer">
            //             <p>{questionnaire.valueProvided}</p>
            //         </div>
            //     </div>
            // </div>)
            return (
              <Summary
                question={questionnaire.question}
                number={index + 1}
                valueProvided={questionnaire.valueProvided}
                key={index}
              />
            );
          })}
        </div>
      );
    } else {
      questionnaire = (
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <div id="question">
              <div className="column">
                <h4>
                  Question {nr}/{total}
                </h4>
                <p>{question}</p>
              </div>
              <div className="column">
                <p>
                  <img id="image" src={this.state.randomImageLink} />
                </p>
              </div>
           
            </div>

            <input
              type="text"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.providedAnswer}
            />
            <div id="buttons" className="d-flex">
            <div id="previous">
              {showPrevious ? (
                <button
                  className="btn btn-primary"
                  onClick={this.previousQuestion}
                >
                  Previous
                </button>
              ) : null}
            </div>

            <div id="submit">
              {showButton ? (
                <button className="btn btn-primary" onClick={this.nextQuestion}>
                  {nr === total ? "Finish quiz" : "Next question"}
                </button>
              ) : null}
            </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        {displaySummary ? (
          <div>
            <h1>Summary</h1>
            {summary}
            <div className="row">
              <button className="btn btn-primary" onClick={this.resetClick}>
                Reset Quiz
              </button>
            </div>
          </div>
        ) : (
          questionnaire
        )}
      </div>
    );
  }
}

export default Main;
