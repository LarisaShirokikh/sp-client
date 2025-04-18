import { Dispatch, SetStateAction } from "react";
import {  UserData } from "./auth";

export interface ProfileModalsProps {
  isAvatarModalOpen: boolean;
  setIsAvatarModalOpen: Dispatch<SetStateAction<boolean>>;
  isCoverModalOpen: boolean;
  setIsCoverModalOpen: Dispatch<SetStateAction<boolean>>;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: Dispatch<SetStateAction<boolean>>;
  avatarPreview: string | null;
  coverPreview: string | null;
  avatarUrl: string;
  userData: UserData;
  avatarFile: File | null;
  setAvatarFile: Dispatch<SetStateAction<File | null>>;
  coverFile: File | null;
  setCoverFile: Dispatch<SetStateAction<File | null>>;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileForm: ProfileFormType;
  handleProfileInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAvatarSubmit: () => Promise<void>;
  handleCoverSubmit: () => Promise<void>;
  handleProfileSubmit: () => Promise<void>;
}

export interface ProfileAvatarProps {
    avatarUrl: string;
    userData?: UserData;
    avatarError: boolean;
    setAvatarError: Dispatch<SetStateAction<boolean>>;
    onChangeAvatar: () => void;
    onEditProfile: () => void;
  }

  export type ProfileFormType = {
    name: string;
    full_name: string;
    email: string;
    phone: string;
    description: string;
  };


  export interface CoverPhotoProps {
    coverPhotoUrl?: string | null;
    userData?: UserData;
    onChangeCover: () => void;
  }

  export interface Medal {
    
    name: string;
    icon: string;
    description: string;
  }