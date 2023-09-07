import React, { useRef, useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {

    const [btn, setBtn] = useState(false);

    const refWolverine = useRef(null)

    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1000);

    }, [])

    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg");
    }
    
    const removeLeftImg = () => {
        refWolverine.current.classList.remove("leftImg");
    }

    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    }

    const removeRightImg = () => {
        refWolverine.current.classList.remove("rightImg");
    }

    const displayBtn = btn && (
        <Fragment>
            <div onMouseOver={setLeftImg} onMouseOut={removeLeftImg} className='leftBox'>
                <Link to="/signup" className='btn-welcome'>Inscription</Link>
            </div>
            <div onMouseOver={setRightImg} onMouseOut={removeRightImg} className='rightBox'>
                <Link to='/login' className='btn-welcome'>Connexion</Link>
            </div>
        </Fragment>
    )


  return (
    <main ref={refWolverine} className="welcomePage">
        { displayBtn }
    </main>
  )
}

export default Landing
