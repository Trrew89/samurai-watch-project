import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import {Roboto_Condensed} from 'next/font/google'

// to add any styles go to global css file "global.css" and change .pn-msg

const roboto = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'] 
})

const MyChat = ({pubnub, className}) => {
    const currentChannel = "Default";
    const theme = "dark";

   //console.log = console.warn = console.error = () => {}; // to clear console from error about defaultProps 
    return (
        <div className={`${className || ''} ${roboto.className}`}>
        <PubNubProvider client={pubnub}>
          <Chat {...{ currentChannel, theme}}> 
            <MessageList/>  
            <MessageInput senderInfo={true}/>
          </Chat>
        </PubNubProvider>
      </div>
    );
};


export default MyChat;