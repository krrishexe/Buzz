import Robot from '../assets/robot.gif'
import { useState,useEffect } from 'react'


function Welcome({currentUser}) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username)
    }
  }, [currentUser])
  return (
    <div className='flex justify-center items-center flex-col text-white'>
      <img className='h-80' src={Robot} alt="robot" />
      <h1>Welcome , <span className='text-emerald-400'>{currentUserName} !!</span> </h1>
      <h3>Please select a chat to start messaging..</h3>
    </div>
  )
}

export default Welcome
