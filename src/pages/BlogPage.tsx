import { useEffect } from 'react'
import Blog from '../components/Blog'

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <Blog />
}

export default BlogPage
