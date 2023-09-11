import { createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { auth } from '../Firebase/firebase'

const SignUp = () => {

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [loginData, setLoginData] = useState(data)

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
            console.log(userCredential);
            // Gérer la réussite de l'inscription, par exemple, rediriger l'utilisateur vers la page de connexion.
          })
          .catch((error) => {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
              alert("Cet e-mail est déjà utilisé. Veuillez utiliser un autre e-mail.");
            } else {
              alert("Erreur lors de l'inscription. Veuillez réessayer.");
            }
          });
      };

    const { pseudo, email, password, confirmPassword } = loginData

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword 
    ? <button disabled>Inscription</button> : <button>Inscription</button>

  return (
    <div className='signUpLoginBox'>
        <div className="slContainer">
            <div className="formBoxLeftSignup">

            </div>
            <div className="formBoxRight">
                <div className="formContent">
                    <form onSubmit={handleSignUp}>
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
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
