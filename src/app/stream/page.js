'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PubNub from "pubnub";

import Logo from '@/components/Logo/Logo';
import MyButton from '@/components/UI/Button/MyButton';
import Chat from '@/components/Chat/MyChat';
import { getRefreshToken } from '@/http/tokenApi';
import Tokens from '../providers';

import styles from './StreamPage.module.css'

const page = () => {
    const router = useRouter(); 
    const searchParams = useSearchParams();
    const {accessToken, setAccessToken, refreshToken, setRefreshToken, image} = useContext(Tokens)
    const name = searchParams.get('name') || localStorage.getItem("Name");
    const channel = "g2esports";
    const currentURL = window.location.hostname;

    localStorage.setItem("Name", name);
    if(!accessToken && !localStorage.getItem("Name")) { //check if user have permission to be here
        router.push('/auth')
    } 

    const disconnectOfMatrica = (e) => {
        e.preventDefault();
        localStorage.clear();
        router.push("/auth");
    }

    const pubnub = new PubNub({
        publishKey: 'pub-c-00331706-9b15-4120-979e-4106a4a3fe1d',
        subscribeKey: 'sub-c-d6c4169c-0805-4c7a-a753-4faf01e744d4',
        userId: name
    }); 
    
    pubnub.publish({
        channel: "Default",
        message: {
            userId: name,
          profilePic: image
        }
      });

    pubnub.subscribe({
        channels: ["Default"] 
    });

// If needed in future, we can refresh token every 3 seconds
    // useEffect(() => {
    //     let token = refreshToken;
    //     const interval = setInterval(async () => {
            
    //         const response =  await getRefreshToken(token); 

    //         setAccessToken(response.data.access_token);
    //         setRefreshToken(response.data.refresh_token);

    //         token = response.data.refresh_token;
    //     }, 3000, token);
    //     return () => clearInterval(interval);
    //   }, []);

    
    return (
        <div>
            <Logo/>
            <MyButton 
                className={styles.disconnect_button} 
                onClick={e => disconnectOfMatrica(e)}>
                    Disconnect your Wallet
            </MyButton>
            <div className={styles.content}>
                <iframe
                    src={`https://player.twitch.tv/?channel=${channel}&parent=${currentURL}&autoplay=false`}
                    height="720"
                    width="1080"
                    allowFullScreen
                >
                </iframe>
                <Chat className= {styles.stream_chat} pubnub={pubnub} image={image} name={name}></Chat>
            </div>
        </div>
    );
};

export default page;