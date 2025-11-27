import React, { useState } from 'react';
import { Building, GraduationCap, MapPin, CreditCard } from 'lucide-react';
import PhoneInput from './PhoneInput';

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  schoolName: string;
  grade: string;
  city: string;
  parentName: string;
  parentEmail: string;
  parentPhoneNumber: string;
}

interface GuestCheckoutFormProps {
  onGuestInfoSubmit: (guestInfo: GuestInfo) => void | Promise<void>;
  onCancel: () => void;
  isProcessing?: boolean;
}


const GuestCheckoutForm: React.FC<GuestCheckoutFormProps> = ({
  onGuestInfoSubmit,
  onCancel,
  isProcessing = false
}) => {
  const [formData, setFormData] = useState<GuestInfo>({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    grade: '',
    city: '',
    parentName: '',
    parentEmail: '',
    parentPhoneNumber: ''
  });
  
  const [errors, setErrors] = useState<Partial<GuestInfo>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<GuestInfo> = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email validation - improved regex
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
    }

    // Phone validation - improved
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.includes('|')) {
      const phoneNumber = formData.phone.split('|')[1];
      if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 7) {
        newErrors.phone = 'Please enter a valid phone number (minimum 7 digits)';
      }
    } else {
      newErrors.phone = 'Please select a country code and enter your phone number';
    }

    // School validation - now text input
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School/Institution name is required';
    } else if (formData.schoolName.trim().length < 2) {
      newErrors.schoolName = 'School name must be at least 2 characters';
    }

    // Grade validation - new field
    if (!formData.grade.trim()) {
      newErrors.grade = 'Grade/Level is required';
    } else if (formData.grade.trim().length < 1) {
      newErrors.grade = 'Please specify your grade or academic level';
    }

    // City validation - new field
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.city.trim())) {
      newErrors.city = 'City name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Parent name validation (now mandatory)
    if (!formData.parentName || !formData.parentName.trim()) {
      newErrors.parentName = 'Parent/Guardian name is required';
    } else if (formData.parentName.trim().length < 2) {
      newErrors.parentName = 'Parent name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.parentName.trim())) {
      newErrors.parentName = 'Parent name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Parent email validation (now mandatory)
    if (!formData.parentEmail || !formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Parent/Guardian email is required';
    } else if (!emailRegex.test(formData.parentEmail.trim())) {
      newErrors.parentEmail = 'Please enter a valid parent email address';
    }

    // Parent phone validation (now mandatory)
    if (!formData.parentPhoneNumber || !formData.parentPhoneNumber.trim()) {
      newErrors.parentPhoneNumber = 'Parent/Guardian phone number is required';
    } else if (formData.parentPhoneNumber.includes('|')) {
      const phoneNumber = formData.parentPhoneNumber.split('|')[1];
      if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 7) {
        newErrors.parentPhoneNumber = 'Please enter a valid parent phone number (minimum 7 digits)';
      }
    } else {
      newErrors.parentPhoneNumber = 'Please select a country code and enter parent phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Trim all fields before submitting
      const finalFormData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone,
        schoolName: formData.schoolName.trim(),
        grade: formData.grade.trim(),
        city: formData.city.trim(),
        parentName: formData.parentName!.trim(),
        parentEmail: formData.parentEmail!.trim().toLowerCase(),
        parentPhoneNumber: formData.parentPhoneNumber!,
      };

      await onGuestInfoSubmit(finalFormData);
    } catch (error) {
      console.error('Error submitting guest info:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Parent Name Field */}
        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
            Parent/Guardian Name *
          </label>
          <input
            type="text"
            id="parentName"
            value={formData.parentName}
            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.parentName ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Enter parent/guardian name"
            disabled={isProcessing || isSubmitting}
          />
          {errors.parentName && (
            <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>
          )}
        </div>

        {/* Student Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Student Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Enter student's full name"
            disabled={isProcessing || isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Parent Email Field */}
        <div>
          <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Parent/Guardian Email *
          </label>
          <input
            type="email"
            id="parentEmail"
            value={formData.parentEmail}
            onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.parentEmail ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Enter parent/guardian email"
            disabled={isProcessing || isSubmitting}
          />
          {errors.parentEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.parentEmail}</p>
          )}
        </div>

        {/* Student Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Student Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Enter student's email address"
            disabled={isProcessing || isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Parent Phone Field */}
        <div>
          <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Parent/Guardian Phone Number *
          </label>
          <PhoneInput
            value={formData.parentPhoneNumber}
            onChange={(value) => setFormData({ ...formData, parentPhoneNumber: value })}
            error={errors.parentPhoneNumber}
            disabled={isProcessing || isSubmitting}
            placeholder="Enter parent/guardian phone number"
          />
        </div>

        {/* Student Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Student Phone Number *
          </label>
          <PhoneInput
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            error={errors.phone}
            disabled={isProcessing || isSubmitting}
            placeholder="Enter student's phone number"
          />
        </div>

        {/* School Name Field - Now Text Input */}
        <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
            <Building className="inline h-4 w-4 mr-1" />
            School/Institution *
          </label>
          <input
            type="text"
            id="school"
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.schoolName ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Enter your school or institution name"
            disabled={isProcessing || isSubmitting}
          />
          {errors.schoolName && (
            <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>
          )}
        </div>

        {/* Grade Field - New */}
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            <GraduationCap className="inline h-4 w-4 mr-1" />
            Grade/Academic Level *
          </label>
          <input
            type="text"
            id="grade"
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.grade ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="e.g., Grade 10, Undergraduate, Graduate, etc."
            disabled={isProcessing || isSubmitting}
          />
          {errors.grade && (
            <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
          )}
        </div>

        {/* City Field - New */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline h-4 w-4 mr-1" />
            City *
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${errors.city ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Enter your city"
            disabled={isProcessing || isSubmitting}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>



        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing || isSubmitting}
            className="w-full sm:flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isProcessing || isSubmitting}
            className="w-full sm:flex-1 px-4 py-2.5 bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white rounded-xl hover:from-[#1f2444] hover:to-[#9f162e] focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg flex items-center justify-center font-bold"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                Continue to Payment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestCheckoutForm;
