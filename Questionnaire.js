import React, { Component } from 'react'

class Questionnaire extends Component {
    render() {
        return (
            <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div id="question">
                            <h4>Question {this.props.nr}/{this.props.total}</h4>
                            <p>{question}</p>
                        </div>
                        <input type="text" onChange={this.props.handleChange} value={this.props.providedAnswer} showButton={this.props.handleShowButton}/>
                        {/* <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}/> */}
                        <div id="submit">
                            {this.props.showButton ? <button className="fancy-btn" onClick={this.props.nextQuestion}>{nr===total ? 'Finish quiz' : 'Next question'}</button> : null}
                        </div>
                    </div>
                </div>
        )
    }
}

export default Questionnaire
