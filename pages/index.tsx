import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GradientLayout from '../components/gradientLayout'

export default function Home() {
  return (
    <GradientLayout 
      color="red" 
      subtitle="profile" 
      title="Coding Krazy" 
      description="15 best playlists" 
      image={'https://pbs.twimg.com/profile_images/1318384193496322054/_w5IW4gs_400x400.jpg'}
      roundImage
    >
      <div>Helllllo</div>
    </GradientLayout>
  )
}
