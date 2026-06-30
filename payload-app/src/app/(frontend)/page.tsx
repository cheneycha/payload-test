import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const postsData = await payload.find({
    collection: 'posts',
    sort: '-createdAt', // Get newest first
  })
  return (
    <div className="home" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        {user ? <h1>Welcome back, {user.email}!</h1> : <h1>Welcome to our site</h1>}
        <a href={payloadConfig.routes.admin} style={{ color: '#0070f3', textDecoration: 'underline' }}>
          Go to admin panel
        </a>
      </header>
      <main>
        <h2>Latest Posts</h2>
        {postsData.docs.length === 0 ? (
          <p>No posts found. Log in to the admin panel and add some!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {postsData.docs.map((post) => (
              <article key={post.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h3>
                {/* Render content snippet if available */}
                {post.content && (
                  <div style={{ color: '#666', marginTop: '0.5rem' }}>
                    <RichText data={post.content} />
                  </div>
                )}

              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
