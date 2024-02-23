import NextLink from 'next/link'
import { useAccount } from 'wagmi'

export const TestPage = () => {
  const { isConnected } = useAccount()
  console.log('isConnected...', isConnected)

  return (
    <div>
      test page
      <NextLink href="/">
        back
      </NextLink>
    </div>
  )
}

export default TestPage