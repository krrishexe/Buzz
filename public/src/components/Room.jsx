import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSocket } from '../providers/SocketContextProvider'
import peer from '../service/peer'
import "../btncss.css"

function Room() {
  const socket = useSocket()
  const [remoteSocketId, setRemoteSocketId] = useState(null)
  const [myStream, setMyStream] = useState()
  const [remoteStream, setRemoteStream] = useState()


  const handleUserJoined = useCallback(({ username, id }) => {
    console.log(`User ${username} joined the Video`)
    setRemoteSocketId(id)
  }, [])

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    const offer = await peer.getOffer();
    socket.emit("user-call", { to: remoteSocketId, offer })
    setMyStream(stream)

  },[remoteSocketId, socket])

  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    setRemoteSocketId(from)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    setMyStream(stream)
    console.log('incoming call',from, offer)
    const ans = await peer.getAnswer(offer)
    socket.emit("call-accepted", { to: from, ans })
  }, [socket])

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream)
    }
  },[myStream])


  const handleCallAccepted = useCallback(async ({ ans }) => {
    peer.setLocalDescription(ans)
    console.log('call-accepted!')
    sendStreams()

  }, [sendStreams])

  const handleNegoNeedIncoming = useCallback(async ({from, offer}) => {
    const ans = await peer.getAnswer(offer)
    socket.emit('negotiation-done', { to: from, ans })
  }, [socket])
  
  const handleNegoFinal = useCallback(async ({ans}) => {
    await peer.setLocalDescription(ans)
  }, [])



  useEffect(() => {
    socket.on("user-joined", handleUserJoined)
    socket.on('incoming-user-call', handleIncomingCall)
    socket.on('call-accepted', handleCallAccepted)
    socket.on('peer-nego-needed', handleNegoNeedIncoming)
    socket.on('peer-nego-final', handleNegoFinal)

    return () => {
      socket.off("user-joined", handleUserJoined)
      socket.off('incoming-user-call', handleIncomingCall)
      socket.off('call-accepted', handleCallAccepted)
      socket.off('peer-nego-needed', handleNegoNeedIncoming)
      socket.off('peer-nego-final', handleNegoFinal)


    }
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoFinal])


  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer()
    socket.emit("peer-neg-needed", { offer , to: remoteSocketId})
  }, [remoteSocketId, socket])

  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
    return () => {
      peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)
    }
  },[handleNegoNeeded])

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      console.log("GOT TRACKS!!");
      const remoteStream = ev.streams;
      console.log(remoteStream)
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: '#131324' }} className='h-screen w-screen flex justify-center items-center flex-col gap-4 '>
        <div style={{ backgroundColor: '#00000076', height: '85vh', width: '85vw'}} >
          <h1>Room page</h1>
          <p>{
            remoteSocketId ? "connected" : "No one else in the video."
          }</p>
          {myStream && <button onClick={sendStreams}>Send Stream</button>}
          {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
          {
            myStream && (
              <>
                <h1>User Stream</h1>
                <ReactPlayer playing muted url={myStream} width="200px" height="100px" />
              </>
            )
          }
          {
            remoteStream && (
              <>
                <h1>Remote Stream</h1>
                <ReactPlayer playing muted url={remoteStream} width="500px" height="300px" />
              </>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default Room
