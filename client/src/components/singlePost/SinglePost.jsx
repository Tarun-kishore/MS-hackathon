import "./singlePost.css"
import pic from '../assets/play2learn.jpeg'
import { Box, Image } from "@chakra-ui/react"

export default function SinglePost() {
  return (
    <Box w='400px' rounded='10px' overflow='hidden' boxShadow='sm' bg='gray.200'>
        <Image src={pic}/>
        <Box p = {5}></Box>
    </Box>
  )
}
