import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute,host } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import axios from 'axios'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'

function Chat() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)

  const socket = useRef();
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login')
    }
    else {
      const fetchCurrentUser = async () => {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
      }
      fetchCurrentUser()
      // console.log("current user called", currentUser)
    }
  }, [])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host)
      socket.current.emit('add-user',currentUser._id)
    }
  })

  useEffect(() => {
    const currentUserData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        }
        else {
          navigate('/setAvatar')
        }
      }
    }
    currentUserData()
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <>
      <div style={{ backgroundColor: '#131324' }} className='h-screen w-screen flex justify-center items-center flex-col gap-4 '>
        <div style={{ backgroundColor: '#00000076', height: '85vh', width: '85vw', display: 'grid', gridTemplateColumns: '25% 75%' }} >
          <Contacts contacts={contacts} currentUser={currentUser} handleChatChange={handleChatChange} />
          {
            currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default Chat
