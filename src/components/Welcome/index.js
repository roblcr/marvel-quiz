import React, { Fragment, useEffect, useState } from 'react'
import Logout from '../Logout'
import Quiz from '../Quiz'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase/firebase'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

  const [userSession, setUserSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserSession(user)
        }
        else {
            navigate('/')
        }
    })
  
    return () => {
      listen()
    }
  }, [])
  
  
  return userSession === null ? (
    <Fragment>
        <div className='loader'></div>
        <p>Loading...</p>
    </Fragment>
  ) : (
    <div className='quiz-bg'>
        <div className='container'>
            <Logout />
            <Quiz />
        </div>
    </div>
  )
}

export default Welcome
