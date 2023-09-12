import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/firebase'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [btn, setBtn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      if (password.length > 5 && email !== '') {
        setBtn(true)
      }
      else if (btn === true) {
        setBtn(false)
      }
    }, [password, email, btn])

    const handleSubmit = (e) => {
        e.preventDefault();
      
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            console.log(user);
            // Gérer la réussite de l'inscription, par exemple, rediriger l'utilisateur vers la page de connexion.
            navigate('/welcome')
          })
          .catch((error) => {
            console.log(error);
            setEmail('')
            setPassword('')
            setError(error)
          });
      };
    

  return (
    <div className='signUpLoginBox'>
      <div className="slContainer">
        <div className="formBoxLeftLogin">

        </div>
        <div className="formBoxRight">
            <div className="formContent">

                {error !== '' && <span>{error.message}</span>}

                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input onChange={e => setEmail(e.target.value)} value={email} type='email' autoComplete='off' required/>
                        <label htmlFor='email'>Email</label>
                    </div>

                    <div className="inputBox">
                        <input onChange={e => setPassword(e.target.value)} value={password} type='password' autoComplete='off' required/>
                        <label htmlFor='password'>Mot de passe</label>
                    </div>

                    {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}

                </form>
                <div className="linkContainer">
                    <Link className='simpleLink' to="/signup">Nouveau ici? Inscrivez-vous !</Link>
                    <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié ? Récupérez-le ici</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
