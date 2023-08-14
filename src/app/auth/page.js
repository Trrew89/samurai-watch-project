'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import MyButton from '@/components/UI/Button/MyButton';
import Logo from '@/components/Logo/Logo';
import TeamsCompetition from '@/components/TeamsCompetition/TeamsCompetition';
import { getToken } from '@/http/tokenApi';
import { getNfts, getUser } from '@/http/userApi'
import Tokens from '../providers';

import styles from './AuthPage.module.css';
import Loading from '@/components/Loading/Loading';

const Auth = () => {
  const [nftCollectionName, setNftCollectionName] = useState('');
  const [userName, setUserName] = useState('');
  const {accessToken, setAccessToken, refreshToken, setRefreshToken, image} = useContext(Tokens)
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  
  const connectToMatrica = async(e) => {
    e.preventDefault();
    const currentUrl = window.location.href;
    router.push(`https://matrica.io/oauth2?client_id=bf4ca2c4fb1defc&scope=profile%20nfts&response_type=code&redirect_uri=${currentUrl}&code_challenge=gZZ8J4RSrIrrJVRoGSMgJ17borOtw4vwKBNnwqkBoro&code_challenge_method=S256`)
  }

  const getUserPermisson = async () => {
    const data = window.location.href.split('code=');
    
    if(data.length === 2) {
      setLoading(prev => !prev)
      const code = data[1];

      const response = await getToken(code); 
      setAccessToken(response.data.access_token); 
      setRefreshToken(response.data.refresh_token); 

      const user = await getUser(response.data.access_token);
      setUserName(user);

      const nfts = await getNfts(response.data.access_token);
      setNftCollectionName(nfts.collection.name);
    }
  }

  useEffect(() => {
    getUserPermisson();
  }, [])

  useEffect(() => {
    if(nftCollectionName == "Samurai Army"){
      setLoading(false)
      router.push(`/stream?name=${userName}`)
    }
  }, [nftCollectionName])

    return (
      <div >
          <Logo/>
        <div className={styles.container}>
          {loading ? 
            <Loading className={styles.loading}/>
            :
            <div className={styles.content}>
              <TeamsCompetition/>
              <MyButton onClick={e => connectToMatrica(e)}>Connect your Wallet</MyButton>
            </div> 
          }
        </div>
      </div>


    );
};

export default Auth;