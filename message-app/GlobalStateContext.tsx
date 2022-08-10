import React, { createContext, useState, useContext, Dispatch, SetStateAction } from "react";
import { WebSocketHook, WebSocketLike } from "react-use-websocket/dist/lib/types";

export interface GlobalStateInterface {
    username: string;
    loggedIn: boolean;
    lastMessages: any;
    webSocket: WebSocketLike;
  }
const GlobalStateContext = createContext({
    state: {} as Partial<GlobalStateInterface>,
    setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
  });
  
  const GlobalStateProvider = ({
    children,
    value = {} as GlobalStateInterface,
  }: {
    children: React.ReactNode;
    value?: Partial<GlobalStateInterface>;
  }) => {
    const [state, setState] = useState(value);
    
    return (
      <GlobalStateContext.Provider value={{ state, setState }}>
        {children}
      </GlobalStateContext.Provider>
    );
  };
  
  const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
      throw new Error("useGlobalState must be used within a GlobalStateContext");
    }
    return context;
  };


  
  export { GlobalStateProvider, useGlobalState };
  