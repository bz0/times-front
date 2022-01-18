import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import axios from 'axios'
import { parseCookies, setCookie, destroyCookie } from 'nookies'


const handleSocialLoginRequest = async () => {
  const cookies = parseCookies()

  const { data } = await axios.get('https://localhost/api/me', {
    headers: {
      'Authorization' : 'Bearer ' + cookies['api_token']
    },
  });
  console.log("data:",data);
  return data;
}

const Me: NextPage = () => {
  const data = handleSocialLoginRequest();
  return (
    <>
      <div>me!!</div>
    </>
  )
}

export default Me