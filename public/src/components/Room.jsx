import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSocket } from '../providers/SocketContextProvider'
import peer from '../service/peer'


function Room() {
  const socket = useSocket()
  const [remoteSocketId, setRemoteSocketId] = useState(null)
  const [myStream, setMyStream] = useState()


  const handleUserJoined = useCallback(({ username, id }) => {
    console.log(`User ${username} joined the Video`)
    setRemoteSocketId(id)
  }, [])

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    const offer = await peer.getOffer();
    socket.emit("user-call", { to: remoteSocketId, offer })
    setMyStream(stream)

  })

  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    setRemoteSocketId(from)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    setMyStream(stream)
    console.log(`incoming call from ${from, offer}`)
    const ans = await peer.createAnswer(offer)
    socket.emit("call-accepted",{to:from,ans})
  }, [socket])

  const handleCallAccepted = useCallback(async ({from,ans})=>{
    peer.setLocalDescription(ans)
    console.log('call-accepted!')
  },[])


  useEffect(() => {
    socket.on("user-joined", handleUserJoined)
    socket.on('incoming-user-call', handleIncomingCall)
    socket.on('call-accepted', handleCallAccepted)


    return () => {
      socket.off("user-joined", handleUserJoined)
      socket.off('incoming-user-call', handleIncomingCall)
      socket.off('call-accepted', handleCallAccepted)

    }
  }, [socket, handleUserJoined, handleIncomingCall,handleCallAccepted])

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
