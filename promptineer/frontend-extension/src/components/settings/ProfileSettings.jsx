/**
 * Profile Settings Component
 * 
 * User profile information management.
 * 
 * Path: src/components/settings/ProfileSettings.jsx
 */

import React, { useState } from 'react';
import { useAuthStore, useUiStore } from '@store/useStore';
import { Button, Input, Card } from '@components/common';

const ProfileSettings = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const { addNotification } = useUiStore();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully',
      });
    }
  };

  return (
    <div className="max-w-2xl">
      <Card>
        <h3 className="text-xl font-semibold text-neutral-50 mb-6">
          Profile Settings
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <Input
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />

          <Button type="submit" loading={isLoading}>
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileSettings;
