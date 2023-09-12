import { createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../Firebase/firebase'
import { addDoc, collection } from 'firebase/firestore'

const SignUp = () => {

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value})
    } 

    const handleSignUp = (e) => {
        e.preventDefault();
      
        if (password !== confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
      
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
    
            // Enregistrez le pseudo de l'utilisateur dans Firestore
            const userRef = collection(db, 'users');
            addDoc(userRef, {
              uid: user.uid,
              pseudo: pseudo,
            });

            setLoginData(data)
            // Gérer la réussite de l'inscription, par exemple, rediriger l'utilisateur vers la page de connexion.
            navigate('/welcome')
          })
          .catch((error) => {
            setError(error)
          });
      };

    const { pseudo, email, password, confirmPassword } = loginData

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword 
    ? <button disabled>Inscription</button> : <button>Inscription</button>

    // gestion des erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
        <div className="slContainer">
            <div className="formBoxLeftSignup">

            </div>
            <div className="formBoxRight">
                <div className="formContent">
                    <form onSubmit={handleSignUp}>
                        {errorMsg}
                        <h2>Inscription</h2>
                        <div className="inputBox">
                            <input onChange={handleChange} value={pseudo} type='text' id='pseudo' autoComplete='off' required/>
                            <label htmlFor='pseudo'>Pseudo</label>
                        </div>

                        <div className="inputBox">
                            <input onChange={handleChange} value={email} type='email' id='email' autoComplete='off' required/>
                            <label htmlFor='email'>Email</label>
                        </div>

                        <div className="inputBox">
                            <input onChange={handleChange} value={password} type='password' id='password' autoComplete='off' required/>
                            <label htmlFor='password'>Mot de passe</label>
                        </div>

                        <div className="inputBox">
                            <input onChange={handleChange} value={confirmPassword} type='password' id='confirmPassword' autoComplete='off' required/>
                            <label htmlFor='confirmPassword'>Confirmer votre mot de passe</label>
                        </div>
                        {btn}
                    </form>
                    <div className="linkContainer">
                        <Link className='simpleLink' to="/login">Déja inscrit? Connectez-vous !</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
