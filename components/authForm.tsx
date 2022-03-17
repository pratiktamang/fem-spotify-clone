import { Box, Flex, Input, Button} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSWRconfig } from 'swr'
import { useState } from 'react'
import { auth } from '../lib/mutations'

const AuthForm: FC<{mode: string}> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading,  setIsLoading]= useState('')
  const router = useRouter()

  return (
    <Box height="100vh" width="100vw">
			<Flex justify="center" align="center" height="100px">
				hello
			</Flex>
    	<Flex justify="center" align="center" height="calc(100vh-100px)">
				form	
			</Flex>  
    </Box>
  )
}

export default AuthForm

