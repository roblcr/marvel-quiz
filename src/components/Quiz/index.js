import React, { Component } from 'react'
import Levels from '../Levels'
import ProgessBar from '../ProgressBar'
import { QuizMarvel } from '../quizMarvel'

class Quiz extends Component {

    state = {
        levelNames: ['debutant', 'confirme', 'expert'],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0
    }

    storedDataRef = React.createRef()

    loadQuestions = quizz => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz]
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            this.storedDataRef.current = fetchedArrayQuiz

           const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)
           
           this.setState({
            storedQuestions: newArray
           })

        } else {
            console.log('pas assez de questions')
        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
            })
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {

        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer
        if (this.state.userAnswer === goodAnswer) {
            this.setState(prevState => ({
                score: prevState.score + 1
            }))
        }

    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    render() {

        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index} 
                   className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                   onClick={() => this.submitAnswer(option)}
                   >
                    {option}</p>
            )
        })

        return (
            <div>
                <Levels />
                <ProgessBar />
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button disabled={this.state.btnDisabled} onClick={this.nextQuestion} className="btnSubmit">Suivant</button>
            </div>
          )
    }
}

export default Quiz
