import { Card, Avatar, Text, Button, Badge, Group, ActionIcon } from '@mantine/core'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'
import UserProfile from '../components/user-profile'

export default function Profile() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  console.log(user)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div
      style={{
        maxWidth: 320,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      {!user ? (
        <Button onClick={() => router.push('/api/auth/login')}>Login with google</Button>
      ) : (
        <div
          style={{
            maxWidth: 320,
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Button onClick={() => router.push('/api/auth/logout')}>Logout</Button>
          <UserProfile user={user} />
        </div>
      )}
    </div>
  )
}
