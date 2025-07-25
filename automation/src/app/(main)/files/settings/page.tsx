'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Profile from './_components/ProfilePicture';
import { ProfileForm } from '../../../components/forms/ProfileForms';
import { db } from '../../../../lib/db';

type UserType = {
  name: string;
  email: string;
  profileImage: string;
};

const fetchUser = async (): Promise<UserType> => {
  // Simulated fetch - replace with real DB query if needed
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: 'John Doe',
          email: 'john@example.com',
          profileImage: '',
        }),
      1000
    )
  );
};

const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth(); // Get Clerk user ID

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUser(); // Replace with actual DB fetch if needed
        setUser(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleUpdate = async (name: string) => {
    if (!userId) return;

    try {
      const updatedUser = await db.user.update({
        where: { clerkId: userId },
        data: { name },
      });
      console.log('Updated user:', updatedUser);
      setUser((prev) => (prev ? { ...prev, name } : prev));
      setError(null);
    } catch (err) {
      console.error('Error updating user name:', err);
      setError('Failed to update user name.');
    }
  };

  const uploadProfileImage = async (image: string) => {
    if (!userId) return;

    try {
      const response = await db.user.update({
        where: { clerkId: userId },
        data: { profileImage: image },
      });
      console.log('Uploaded profile image:', response);
      setUser((prev) => (prev ? { ...prev, profileImage: image } : prev));
      setError(null);
      return response;
    } catch (err) {
      console.error('Error uploading profile image:', err);
      setError('Failed to upload profile image.');
    }
  };

  const removeProfileImage = async () => {
    if (!userId) return;

    try {
      const response = await db.user.update({
        where: { clerkId: userId },
        data: { profileImage: '' },
      });
      console.log('Removed profile image:', response);
      setUser((prev) => (prev ? { ...prev, profileImage: '' } : prev));
      setError(null);
      return response;
    } catch (err) {
      console.error('Error removing profile image:', err);
      setError('Failed to remove profile image.');
    }
  };

  if (loading) {
    return <div className="p-4">Loading user profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="p-4">No user data found.</div>;
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
        <ProfileForm user={user} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ProfilePage;
