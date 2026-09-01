import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/posts/${slug}.md`)
    .then(response => response.text())
    .then(content => setContent(content))
  }, [slug]);

  return (
    <div>
      <h2>Blog</h2>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}