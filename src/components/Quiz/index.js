import React, { Component } from 'react'
import Levels from '../Levels'
import ProgessBar from '../ProgressBar'

class Quiz extends Component {
    render() {

        const { pseudo } = this.props.pseudo

        return (
            <div>
                <Levels />
                <ProgessBar />
                <h2>Notre Question Quiz</h2>
                <p className='answerOptions'>Reponse 1</p>
                <p className='answerOptions'>Reponse 2</p>
                <p className='answerOptions'>Reponse 3</p>
                <p className='answerOptions'>Reponse 4</p>
                <button className="btnSubmit">Suivant</button>
            </div>
          )
    }
}

export default Quiz
