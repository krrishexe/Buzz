import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'

function Logout() {
    const navigate = useNavigate()
    const handleClick = async () =>{
        localStorage.clear()
        navigate('/login')
    }
  return (
    <button onClick={handleClick} className='flex justify-center items-center p-2 rounded-lg bg-violet-400 border-none cursor-pointer text-xl'>
      <BiPowerOff className='text-white' />
    </button>
  )
}

export default Logout
