import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.svg'
import './Contacts.css'



function Contacts({ contacts, currentUser, handleChatChange }) {

  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
  }, [currentUser])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    handleChatChange(contact)
  }

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <div style={{ display: 'grid', gridTemplateRows: '10% 75% 15%', overflow: 'hidden', backgroundColor: '#080420' }} className=''>
            <div className='flex justify-center items-center gap-4 '>
              <img className='h-8' src={Logo} alt="" />
              <h3 className='text-white uppercase'>Chatty</h3>
            </div>

            <div className="scrollbar flex flex-col items-center overflow-auto gap-3">
              {
                // eslint-disable-next-line react/prop-types
                contacts.map((contact, index) => {
                  return (

                    <div key={index} style={{ minHeight: '5rem', width: '90%' }} onClick={()=>{changeCurrentChat(index,contact)}} className={`bg-slate-400/40 cursor-pointer rounded-md p-2 gap-4 items-center flex transition-all  ${index === currentSelected ? 'bg-violet-400/90' : ''}`}>
                      <div className="avatar">
                        <img className='h-12' src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                      </div>

                      <div className="text-white">
                        <h3>{contact.username}</h3>
                      </div>

                    </div>
                  )
                })
              }
            </div>
            <div style={{ backgroundColor: '#0d0d30' }} className=" currentuser flex justify-center items-center gap-8 ">
              <div className="avatar">
                <img className='h-16' src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
              </div>

              <div className="username">
                <h2 className='text-white'>{currentUserName}</h2>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Contacts
