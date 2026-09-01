import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../shared/api/getPosts'
import { Link } from 'react-router-dom'

export default function Blog() {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return <div>Error occurred while fetching posts.</div>
  }

  console.log(posts)
  return (
    <div>
      <h1>Blog 화면</h1>
      {posts?.map(post => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.summary}</p>
          <small>{post.created_at}</small>
        </div>
      ))}
    </div>  
  )
}