'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Profile from './_components/ProfilePicture';
import { db } from '../../../../lib/db.js';
import ProfileForm from '../../../components/forms/ProfileForms.jsx';

// Simulated fetch user
const fetchUser = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ name: 'John Doe', email: 'john@example.com', profileImage: '' }), 1000)
  );
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useAuth(); // Get userId from useAuth

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  const handleUpdate = async (name) => {
    const updatedUser = await updateUserInfo(name);
    console.log('Updated user:', updatedUser);
  };

  const uploadProfileImage = async (image) => {
    const response = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        profileImage: image,
      },
    });
    return response;
  };

  const updateUserInfo = async (name) => {
    const updatedUser = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        name,
      },
    });
    return updatedUser;
  };

  const removeProfileImage = async () => {
    const response = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        profileImage: '',
      },
    });
    return response;
  };

  if (!user) {
    return <div className="p-4">Loading user profile...</div>;
  }

  return (
    <div className="ml-[83px] flex flex-col gap-4">
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
        <Profile
          onDelete={removeProfileImage}
          userImage={user.profileImage || ''}
          onUpload={uploadProfileImage}
        />
        <ProfileForm
          user={user}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default ProfilePage;