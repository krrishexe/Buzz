import { React, useContext, useMemo, createContext } from 'react';
import { io } from "socket.io-client"

const socketContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
    const socket = useContext(socketContext)
        return socket
  };

export const SocketContextProvider = ({ children }) => {

    const socket = useMemo(
        () => io("http://localhost:5001")
        , []);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}


