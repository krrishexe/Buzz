import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSocket } from '../providers/SocketContextProvider'



function Room() {
  const socket = useSocket()
  const[remoteSocketId,setRemoteSocketId] = useState(null)
  const [myStream, setMyStream] = useState()


  const handleUserJoined = useCallback(({username,id})=>{
    console.log(`User ${username} joined the Video`)
    setRemoteSocketId(id)
  },[])

  const handleCallUser = useCallback(async () =>{
    const stream = await navigator.mediaDevices.getUserMedia({audio: true , video:true})

    setMyStream(stream)

  })

  useEffect(()=>{
    socket.on("user-joined",handleUserJoined)

    return ()=>{
      socket.off("user-joined",handleUserJoined)
    }
  },[socket,handleUserJoined])

  return (
    <div>
      <h1>Room page</h1>
      <p>{
          remoteSocketId ? "connected" : "No one else in the video."
        }</p>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {
        myStream && <ReactPlayer playing muted url={myStream} width="100%" height="100%" />
      }
    </div>
  )
}

export default Room
