import React, { useEffect, useRef, useState } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'


function ChatContainer({ currentChat, currentUser,socket }) {

    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)

    const scrollRef = useRef()

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:'smooth'})   
    },[messages])

    const handleSendMsg = async (msg) => {
        const data = await axios.post(sendMessageRoute, {
            message: msg,
            from: currentUser._id,
            to: currentChat._id,
        })
        socket.current.emit('send-msg',{
            message: msg,
            from: currentUser._id,
            to: currentChat._id,
        })
        
        const msgs = [...messages]
        msgs.push({fromSelf:true,message: msg})
        setMessages(msgs)
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on('msg-recieve',(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg})
            })
        }
    },[])

    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage])


    useEffect(() => {
        if(currentChat){
            const handleFunction = async () => {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                })
                setMessages(response.data)
            }
            handleFunction()
        }
    }, [currentChat])

    return (
        <div style={{ display: 'grid', gridTemplateRows: '10% 80% 10%', gap: '0.1rem', overflow: 'hidden' }} className='py-4'>
            <div className="flex justify-between items-center px-8 ">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <img className='h-12' src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
                    </div>
                    <div className="username">
                        <h3 className='text-white'>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className='pt-4 pb-4 pl-8 pr-8 flex flex-col gap-4 overflow-auto'>
                {
                    messages.map((message, index) => {
                        return (
                            <div ref={scrollRef} key={index}>
                                <div className={`flex items-center ${message.fromSelf ? 'justify-end' : 'justify-start  '}`}>
                                    <div style={{
                                        maxWidth: '40%', overflowWrap: 'break-word',
                                        padding: '1rem', fontSize: '1.1rem', borderRadius: '1rem', color: '#d1d1d1', backgroundColor: '#4f04ff21'
                                    }} className="content">
                                        <p>
                                            {
                                                message.message
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default ChatContainer
