import { React, useContext, useMemo, useState } from 'react';
import { io } from "socket.io-client"
import socketContext from './SocketContextProvider';

const socketContextProvider = ({ children }) => {

    const socket = useMemo(() => io({
        host: 'localhost',
        port: 5001
    }), [])

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}

export default socketContextProvider;

export const useSocket = () =>{
    return useContext()
}


