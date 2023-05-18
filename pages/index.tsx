import { useIsMounted } from '../hooks'
import Home from '../components/Home'

const Page = () => {
  const isMounted = useIsMounted()

  if (!isMounted) return null
  return (
    <>
      <Home />
    </>
  )
}

export default Page