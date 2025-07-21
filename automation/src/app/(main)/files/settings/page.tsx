'use client'

import React, { useEffect, useState } from 'react'
import ProfileForm from '../../../components/forms/ProfileForms'

// Simulated fetch user
const fetchUser = async () => {
  return new Promise<{ name: string; email: string }>((resolve) =>
    setTimeout(() => resolve({ name: 'John Doe', email: 'john@example.com' }), 1000)
  )
}

const ProfilePage = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    fetchUser().then(setUser)
  }, [])

  const handleUpdate = async (name: string) => {
    // your update logic here
    console.log('Updated name:', name)
  }

  if (!user) {
    return <div className="p-4">Loading user profile...</div>
  }

  return (
     <div className=" ml-[83px] flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        {/* <ProfilePicture
          onDelete={removeProfileImage}
          userImage={user?.profileImage || ''}
          onUpload={uploadProfileImage}
        /> */}
        <ProfileForm
          user={user}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  )
}

export default ProfilePage
