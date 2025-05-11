// store/bookingStore.ts
import { defineStore } from 'pinia';
import type { Apartment } from './apartmentStore';

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  roomCount: string;
  message: string;
  agreement: boolean;
  apartmentDetails: Apartment | null;
}

export interface BookingStoreState {
  formData: BookingFormData;
  isSubmitting: boolean;
  showSuccessModal: boolean;
}

export const useBookingStore = defineStore('booking', () => {
  // State
  const formData = reactive<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    roomCount: '',
    message: '',
    agreement: false,
    apartmentDetails: null,
  });

  const isSubmitting = ref(false);
  const showSuccessModal = ref(false);

  // Actions
  const setApartmentDetails = (apartment: Apartment | null) => {
    formData.apartmentDetails = apartment;
    if (apartment) {
      formData.roomCount = apartment.rooms.toString();
    }
  };

  const resetForm = () => {
    formData.name = '';
    formData.phone = '';
    formData.email = '';
    formData.roomCount = '';
    formData.message = '';
    formData.agreement = false;
    formData.apartmentDetails = null;
  };

  const submitForm = async () => {
    isSubmitting.value = true;

    try {
      const data = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        roomCount: formData.roomCount,
        message: formData.message,
        apartmentDetails: formData.apartmentDetails
          ? {
              id: formData.apartmentDetails.id,
              address: formData.apartmentDetails.address,
              rooms: formData.apartmentDetails.rooms,
              scale: formData.apartmentDetails.options[0].scale,
              floor: formData.apartmentDetails.options[0].floor,
              balcony: formData.apartmentDetails.options[0].balcony ? 'С балконом' : 'Без балкона',
            }
          : null,
      };

      // Make API call with apartment details
      const response = await fetch('/.netlify/functions/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Show success message
      showSuccessModal.value = true;
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
      throw error; // Rethrow to handle in component
    } finally {
      isSubmitting.value = false;
    }
  };

  const closeSuccessModal = () => {
    showSuccessModal.value = false;
  };

  return {
    // State
    formData,
    isSubmitting,
    showSuccessModal,

    // Actions
    setApartmentDetails,
    resetForm,
    submitForm,
    closeSuccessModal,
  };
});
