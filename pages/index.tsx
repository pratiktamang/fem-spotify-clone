import GradientLayout from '../components/gradientLayout'
import { prisma } from '../lib/prisma'
import { Box, Text, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { useGetUser } from '../lib/hooks'
import { isResSent } from 'next/dist/shared/lib/utils'
const Home = ({artists}) => {
  const { user } = useGetUser()

  return (
    <GradientLayout 
      color="red" 
      subtitle="profile" 
      title={`${user?.firstName} ${user?.lastName}`} 
      description={`${user?.playlistsCount} public playlists`}
      image={'https://pbs.twimg.com/profile_images/1318384193496322054/_w5IW4gs_400x400.jpg'}
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">Top Artists this Month</Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map(artist => (
            <Box paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">{artist.name}</Box>
              <Image src="https://place.dog/300/200?random" borderRadius="100%" marginTop="20px"></Image>
              <Box marginTop="20px">
                <Text fontSize="Large">{artist.name}</Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => { 
 const artists = await prisma.artist.findMany({})
  return { 
    props: { artists } 
  }
}

export default Home
