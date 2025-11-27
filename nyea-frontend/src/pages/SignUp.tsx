import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, AlertCircle, ArrowRight, Loader2, UserPlus, Building, GraduationCap, MapPin } from 'lucide-react';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school_name: '',
    grade: '',
    city: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    parent_name: '',
    parent_email: '',
    parent_phone_number: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const { signup, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      errors.city = 'City name must be at least 2 characters';
    }

    // Parent name validation (now mandatory)
    if (!formData.parent_name.trim()) {
      errors.parent_name = 'Parent/Guardian name is required';
    } else if (formData.parent_name.trim().length < 2) {
      errors.parent_name = 'Parent name must be at least 2 characters';
    }

    // Parent email validation (now mandatory)
    if (!formData.parent_email.trim()) {
      errors.parent_email = 'Parent/Guardian email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.parent_email.trim())) {
      errors.parent_email = 'Please enter a valid parent email address';
    }

    // Parent phone validation (now mandatory)
    if (!formData.parent_phone_number.trim()) {
      errors.parent_phone_number = 'Parent/Guardian phone number is required';
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.parent_phone_number.replace(/[\s\-()]/g, ''))) {
      errors.parent_phone_number = 'Please enter a valid parent phone number';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Clear general error when user modifies form
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous states
    setError(null);
    setFieldErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.role,
        formData.phone,
        formData.school_name,
        formData.grade,
        formData.city,
        formData.parent_name,
        formData.parent_email,
        formData.parent_phone_number
      );

      if (result.success) {
        setShowSuccess(true);

        // Small delay to show success state before navigation
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
      } else {
        // If backend returned field-level validation errors, surface them inline
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setError(result.error || 'Registration failed. Please check your information and try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses = "block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

    if (fieldErrors[fieldName]) {
      return `${baseClasses} border-red-300 focus:ring-red-500 bg-red-50`;
    }

    return baseClasses;
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Very Weak', color: 'text-red-500' };
      case 2:
        return { text: 'Weak', color: 'text-orange-500' };
      case 3:
        return { text: 'Good', color: 'text-yellow-500' };
      case 4:
        return { text: 'Strong', color: 'text-green-500' };
      case 5:
        return { text: 'Very Strong', color: 'text-green-600' };
      default:
        return { text: '', color: '' };
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to NYEA!</h2>
              <p className="text-gray-600 mb-4">Your account has been successfully created.</p>
              <div className="flex items-center justify-center text-blue-600">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm">Setting up your dashboard...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-gray-600">Join NYEA and start your learning journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Parent Name Field */}
            <div>
              <label htmlFor="parent_name" className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="parent_name"
                  name="parent_name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.parent_name}
                  onChange={handleInputChange}
                  className={`${getInputClasses('parent_name')} pl-10`}
                  placeholder="Enter parent/guardian name"
                />
              </div>
              {fieldErrors.parent_name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.parent_name}
                </p>
              )}
            </div>

            {/* Student Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Student Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${getInputClasses('name')} pl-10`}
                  placeholder="Enter student's full name"
                />
              </div>
              {fieldErrors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Parent Email Field */}
            <div>
              <label htmlFor="parent_email" className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="parent_email"
                  name="parent_email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.parent_email}
                  onChange={handleInputChange}
                  className={`${getInputClasses('parent_email')} pl-10`}
                  placeholder="Enter parent/guardian email"
                />
              </div>
              {fieldErrors.parent_email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.parent_email}
                </p>
              )}
            </div>

            {/* Student Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Student Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${getInputClasses('email')} pl-10`}
                  placeholder="Enter student's email address"
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Parent Phone Field */}
            <div>
              <label htmlFor="parent_phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="parent_phone_number"
                  name="parent_phone_number"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.parent_phone_number}
                  onChange={handleInputChange}
                  className={`${getInputClasses('parent_phone_number')} pl-10`}
                  placeholder="Enter parent/guardian phone number"
                />
              </div>
              {fieldErrors.parent_phone_number && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.parent_phone_number}
                </p>
              )}
            </div>

            {/* School name Field */}
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                School Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="schoolName"
                  name="school_name"
                  type="text"
                  required
                  value={formData.school_name}
                  onChange={handleInputChange}
                  className={`${getInputClasses('school_name')} pl-10`}
                  placeholder="Enter your school name"
                />
              </div>
              {fieldErrors.school_name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.school_name}
                </p>
              )}
            </div>

            {/* Grade and City Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                  Grade/Academic Level
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="grade"
                    name="grade"
                    type="text"
                    required
                    value={formData.grade}
                    onChange={handleInputChange}
                    className={`${getInputClasses('grade')} pl-10`}
                    placeholder="Enter your grade"
                  />
                </div>
                {fieldErrors.grade && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {fieldErrors.grade}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`${getInputClasses('city')} pl-10`}
                    placeholder="Enter your city"
                  />
                </div>
                {fieldErrors.city && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {fieldErrors.city}
                  </p>
                )}
              </div>
            </div>

            {/* Student Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Student Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${getInputClasses('phone')} pl-10`}
                  placeholder="Enter student's phone number"
                />
              </div>
              {fieldErrors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={getInputClasses('role')}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>



            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${getInputClasses('password')} pl-10 pr-10`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Password strength:</span>
                    <span className={strengthInfo.color}>{strengthInfo.text}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength <= 1 ? 'bg-red-500' :
                        passwordStrength === 2 ? 'bg-orange-500' :
                          passwordStrength === 3 ? 'bg-yellow-500' :
                            passwordStrength === 4 ? 'bg-green-500' : 'bg-green-600'
                        }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {fieldErrors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${getInputClasses('confirmPassword')} pl-10 pr-10`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-[#9f162e] to-[#1f2444] hover:from-[#1f2444] hover:to-[#9f162e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9f162e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 