// frontend/pages/profile/settings.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ProfileSettings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('photo-input');
    const file = fileInput.files[0];

    if (!file) {
      setError('Please select a photo');
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch(`${API_URL}/upload/profile-photo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setMessage('Profile photo updated successfully!');
      setUser({ ...user, avatar: data.photoUrl });
      setPreviewImage(null);
      fileInput.value = '';

      // Update stored user info
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      storedUser.avatar = data.photoUrl;
      localStorage.setItem('user', JSON.stringify(storedUser));

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!confirm('Are you sure you want to remove your profile photo?')) {
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/upload/profile-photo`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove photo');
      }

      setMessage('Profile photo removed');
      setUser({ ...user, avatar: data.user.avatar });
      
      // Update stored user info
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      storedUser.avatar = data.user.avatar;
      localStorage.setItem('user', JSON.stringify(storedUser));

    } catch (err) {
      console.error('Remove photo error:', err);
      setError(err.message || 'Failed to remove photo');
    } finally {
      setLoading(false);
    }
  };

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    // Cloudinary URLs and default avatars already have full URLs
    return avatarPath;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile Settings - Climbing Shoe Marketplace</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            </div>

            <div className="p-6">
              {/* Messages */}
              {message && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">{message}</p>
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {/* Profile Photo Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
                
                <div className="flex items-start space-x-6">
                  {/* Current/Preview Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={previewImage || getAvatarUrl(user?.avatar)}
                        alt="Profile"
                        className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                      />
                      {previewImage && (
                        <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Preview
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1">
                    <form onSubmit={handlePhotoUpload}>
                      <div className="mb-4">
                        <label htmlFor="photo-input" className="block text-sm font-medium text-gray-700 mb-2">
                          Choose a new photo
                        </label>
                        <input
                          id="photo-input"
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          JPG, PNG, GIF or WebP. Max size: 5MB
                        </p>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          disabled={uploading || !document.getElementById('photo-input')?.files?.[0]}
                          className={`px-4 py-2 rounded-md text-white font-medium ${
                            uploading || !document.getElementById('photo-input')?.files?.[0]
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {uploading ? 'Uploading...' : 'Upload Photo'}
                        </button>

                        {user?.avatar && !user.avatar.includes('ui-avatars.com') && (
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="px-4 py-2 border border-red-300 rounded-md text-red-700 font-medium hover:bg-red-50"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* User Info Section */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">Account Information</h2>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.username}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Account Status</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user?.verified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user?.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Navigation Links */}
              <div className="border-t mt-6 pt-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push('/profile')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Public Profile
                  </button>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}