/**
 * Login Form Component
 * 
 * User authentication form for login and signup.
 * 
 * Path: src/components/auth/LoginForm.jsx
 */

import React, { useState } from 'react';
import { useAuthStore, useUiStore } from '@store/useStore';
import { Button, Input, Alert } from '@components/common';
import { Card } from '@components/common';

const LoginForm = () => {
  const { login, register, error, isLoading } = useAuthStore();
  const { addNotification } = useUiStore();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [formErrors, setFormErrors] = useState({});

  /**
   * Handle form input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Validate form inputs
   */
  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (isSignup) {
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    return errors;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (isSignup) {
      const result = await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Account Created',
          message: 'Welcome to Promptineer!',
        });
        setIsSignup(false);
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
        });
      }
    } else {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Welcome Back',
          message: 'You are now logged in',
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-full">
      <Card className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mb-3">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-50 mb-1">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-neutral-400">
            {isSignup ? 'Join Promptineer today' : 'Engineer Better Prompts'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert type="error" message={error} className="mb-4" />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Signup: First Name */}
          {isSignup && (
            <Input
              label="First Name"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              error={formErrors.firstName}
            />
          )}

          {/* Signup: Last Name */}
          {isSignup && (
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
          )}

          {/* Email */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            required
          />

          {/* Password */}
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required
          />

          {/* Signup: Confirm Password */}
          {isSignup && (
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
            />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isLoading}
            className="w-full"
          >
            {isSignup ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        {/* Toggle Signup/Login */}
        <div className="text-center mt-4">
          <p className="text-sm text-neutral-400">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            {' '}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setFormErrors({});
              }}
              className="text-primary hover:text-primary-light transition-colors font-medium"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
