// ProfileModals.tsx
import { Dispatch, SetStateAction } from 'react';
import { UserData } from '@/app/interface/auth';
import Modal from '../UI/modal';
import { ProfileFormType } from '@/app/interface/profile';



interface ProfileModalsProps {
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

export default function ProfileModals({
  isAvatarModalOpen,
  setIsAvatarModalOpen,
  isCoverModalOpen,
  setIsCoverModalOpen,
  isProfileModalOpen,
  setIsProfileModalOpen,
  avatarPreview,
  coverPreview,
  avatarUrl,
  userData,
  avatarFile,
  setAvatarFile,
  coverFile,
  setCoverFile,
  handleAvatarChange,
  handleCoverChange,
  profileForm,
  handleProfileInputChange,
  handleAvatarSubmit,
  handleCoverSubmit,
  handleProfileSubmit
}: ProfileModalsProps) {
  return (
    <>
      {/* Модальное окно для изменения аватара */}
      <Modal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        title="Изменить аватар"
      >
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Загрузить новый аватар
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {avatarPreview ? (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Предпросмотр</p>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Текущий аватар</p>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src={avatarUrl}
                  alt="Current Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAvatarModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleAvatarSubmit}
              disabled={!avatarFile}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${avatarFile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
                }`}
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно для изменения обложки */}
      <Modal
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        title="Изменить обложку"
      >
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Загрузить новую обложку
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {coverPreview && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Предпросмотр</p>
              <div className="w-full h-48 rounded-md overflow-hidden">
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCoverModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleCoverSubmit}
              disabled={!coverFile}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${coverFile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
                }`}
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно для редактирования профиля */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Редактировать профиль"
      >
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Имя пользователя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileForm.name}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                Полное имя
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={profileForm.full_name}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                О себе
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={profileForm.description}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleProfileSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}