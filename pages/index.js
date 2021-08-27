import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import 'bootstrap/dist/css/bootstrap.css'
//import { Router } from 'react-router'

export default function Home() {
  return (
    <div className="App">
        <NavBar />
    </div>
  )
}
