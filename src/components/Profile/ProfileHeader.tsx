// ProfileHeader.tsx - Основной компонент
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import ProfileModals from './ProfileModals';
import CoverPhoto from './CoverPhoto';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';
import { UserData } from '@/app/interface/auth';

export default function ProfileHeader() {
  const { userData, isLoading, updateUserProfile } = useAuth();

  // State for modals
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  // State for file uploads
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  // State for profile edit form
  const [profileForm, setProfileForm] = useState({
    name: '',
    full_name: '',
    email: '',
    phone: '',
    description: ''
  });

  useEffect(() => {
    if (userData?.avatar_url) {
      setAvatarError(false);
    }
  }, [userData?.avatar_url]);

  useEffect(() => {
    if (userData) {
      setProfileForm({
        name: userData.name || '',
        full_name: userData.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        description: userData.description || ''
      });
    }
  }, [userData]);

  // Open modals
  const onChangeAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    setIsAvatarModalOpen(true);
  };

  const onEditProfile = () => {
    if (userData) {
      setProfileForm({
        name: userData.name || '',
        full_name: userData.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        description: userData.description || ''
      });
    }
    setIsProfileModalOpen(true);
  };

  const onChangeCover = () => {
    setCoverPreview(null);
    setCoverFile(null);
    setIsCoverModalOpen(true);
  };

  // Submit handlers
  const handleAvatarSubmit = async () => {
    if (!avatarFile) return;

    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      formData.append('update_type', 'avatar_only');

      await updateUserProfile(formData);
      setIsAvatarModalOpen(false);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleCoverSubmit = async () => {
    if (!coverFile) return;

    try {
      const formData = new FormData();
      formData.append('cover_photo', coverFile);
      formData.append('update_type', 'cover_only');

      await updateUserProfile(formData);
      setIsCoverModalOpen(false);
    } catch (error) {
      console.error('Error uploading cover photo:', error);
    }
  };

  const handleProfileSubmit = async () => {
    try {
      await updateUserProfile(profileForm);
      setIsProfileModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Обработчик изменения файла аватара
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setAvatarPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Обработчик изменения файла обложки
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setCoverPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Обработчик изменения полей формы
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="relative -mt-16 flex justify-between items-end">
            <div className="h-32 w-32 rounded-full bg-gray-300"></div>
            <div className="h-10 w-40 bg-gray-300 rounded-md"></div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-7 bg-gray-300 rounded w-1/3"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8000";
  const avatarUrl = userData?.avatar_url
    ? `${mediaUrl}/media/${userData.avatar_url}`
    : "/avatar.png";

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Cover Photo */}
        <CoverPhoto
          coverPhotoUrl={userData?.cover_photo}
          onChangeCover={onChangeCover}
          userData={userData!} />

        {/* Profile Info Section */}
        <div className="relative px-4 sm:px-6 lg:px-8 pb-6">
          {/* Avatar positioned to overlap the cover photo */}
          <ProfileAvatar
            avatarUrl={avatarUrl}
            userData={userData!}
            avatarError={avatarError}
            setAvatarError={setAvatarError}
            onChangeAvatar={onChangeAvatar}
            onEditProfile={onEditProfile}
          />

          {/* User Info */}
          <ProfileInfo userData={userData} />
        </div>
      </div>

      {/* All Modals */}
      <ProfileModals
        isAvatarModalOpen={isAvatarModalOpen}
        setIsAvatarModalOpen={setIsAvatarModalOpen}
        isCoverModalOpen={isCoverModalOpen}
        setIsCoverModalOpen={setIsCoverModalOpen}
        isProfileModalOpen={isProfileModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
        avatarPreview={avatarPreview}
        coverPreview={coverPreview}
        avatarUrl={avatarUrl}
        userData={userData as UserData}
        avatarFile={avatarFile}
        setAvatarFile={setAvatarFile}
        coverFile={coverFile}
        setCoverFile={setCoverFile}
        handleAvatarChange={handleAvatarChange}
        handleCoverChange={handleCoverChange}
        profileForm={profileForm}
        handleProfileInputChange={handleProfileInputChange}
        handleAvatarSubmit={handleAvatarSubmit}
        handleCoverSubmit={handleCoverSubmit}
        handleProfileSubmit={handleProfileSubmit}
      />
    </>
  );
}