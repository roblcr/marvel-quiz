import React, { Fragment, useEffect, useState } from 'react'
import Logout from '../Logout'
import Quiz from '../Quiz'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../Firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'

const Welcome = () => {

  const [userSession, setUserSession] = useState(null)
  const navigate = useNavigate()
  const [pseudo, setPseudo] = useState('')

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserSession(user)

        // Récupérez les données du pseudo depuis Firestore
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setPseudo(doc.data().pseudo);
            });
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération du pseudo :', error);
          });
        }
        else {
            navigate('/')
        }
    })
  
    return () => {
      listen()
    }
  }, [pseudo])
  
  
  return userSession === null ? (
    <Fragment>
        <div className='loader'></div>
        <p>Loading...</p>
    </Fragment>
  ) : (
    <div className='quiz-bg'>
        <div className='container'>
            <Logout />
            <Quiz pseudo={pseudo}/>
        </div>
    </div>
  )
}

export default Welcome
