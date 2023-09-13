import React, { Component } from 'react'
import Levels from '../Levels'
import ProgessBar from '../ProgressBar'
import { QuizMarvel } from '../quizMarvel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';

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
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false
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

    showWelcomeMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {

            this.setState({
                showWelcomeMsg: true
            })

            toast.warn(`Bienvenue, ${pseudo} !`, {
                position: "top-right", // Position du toast
                autoClose: 3000, // Durée d'affichage en millisecondes (3 secondes)
                hideProgressBar: false, // Afficher ou masquer la barre de progression
                closeOnClick: true, // Fermer le toast en cliquant dessus
                pauseOnHover: false, // Mettre en pause le temps de fermeture lors du survol
                draggable: true, // Permettre de faire glisser le toast
              });
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


        if (this.props.pseudo) {
            this.showWelcomeMsg(this.props.pseudo)
        }
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.gameOver()

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

            toast.success('Bravo !', {
                position: "top-right", // Position du toast
                autoClose: 3000, // Durée d'affichage en millisecondes (3 secondes)
                hideProgressBar: false, // Afficher ou masquer la barre de progression
                closeOnClick: true, // Fermer le toast en cliquant dessus
                pauseOnHover: false, // Mettre en pause le temps de fermeture lors du survol
                draggable: true, // Permettre de faire glisser le toast
                bodyClassName: 'toastifyColor'
              });
        } else {
            toast.error(`Raté`, {
                position: "top-right", // Position du toast
                autoClose: 3000, // Durée d'affichage en millisecondes (3 secondes)
                hideProgressBar: false, // Afficher ou masquer la barre de progression
                closeOnClick: true, // Fermer le toast en cliquant dessus
                pauseOnHover: false, // Mettre en pause le temps de fermeture lors du survol
                draggable: true, // Permettre de faire glisser le toast
              });
        }

    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100

    gameOver = () => {

        const gradePercent = this.getPercent(this.state.maxQuestions, this.state.score)

        if (gradePercent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: gradePercent,
                quizEnd: true
            })
        } else {
            this.setState({
                percent: gradePercent,
                quizEnd: true
            })
        }
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

        return this.state.quizEnd ? (
            <QuizOver ref={this.storedDataRef} 
                      levelNames={this.state.levelNames}
                      score={this.state.score}
                      maxQuestions={this.state.maxQuestions}
                      quizLevel={this.state.quizLevel}
                      percent={this.state.percent}
            />
        )
        : (
            <>
                <Levels />
                <ProgessBar idQuestion={this.state.idQuestion}
                            maxQuestions={this.state.maxQuestions}
                 />
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button disabled={this.state.btnDisabled} onClick={this.nextQuestion} className="btnSubmit">
                    {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}
                    </button>
                <ToastContainer />
            </>
        )
    }
}

export default Quiz
