import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase/firebase'
import { signOut } from 'firebase/auth'
import { Tooltip } from 'react-tooltip'

const Logout = () => {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
      if (checked) {
        signOut(auth).then(() => {
        }).catch((error) => {

        })
      }
    }, [checked, auth])

    const handleChange = event => {
        setChecked(event.target.checked)
    }
    

  return (
    <div className='logoutContainer'>
      <label className='switch'>
        <input 
            onChange={handleChange}
            type='checkbox'
            checked={checked}
        />
        <span className='slider round'></span>
        <Tooltip anchorSelect='.switch' place='right' content='Deconnexion'></Tooltip>
      </label>
    </div>
  )
}

export default Logout
