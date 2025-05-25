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
  errorMessage: string | null;
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
  const errorMessage = ref<string | null>(null);

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
    errorMessage.value = null;
  };

  const validateForm = (): boolean => {
    errorMessage.value = null;

    if (!formData.name.trim()) {
      errorMessage.value = 'Пожалуйста, укажите ваше имя';
      return false;
    }

    if (!formData.phone.trim()) {
      errorMessage.value = 'Пожалуйста, укажите номер телефона';
      return false;
    }

    // Простая валидация телефона
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errorMessage.value = 'Пожалуйста, укажите корректный номер телефона';
      return false;
    }

    // Валидация email если указан
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errorMessage.value = 'Пожалуйста, укажите корректный email';
        return false;
      }
    }

    if (!formData.agreement) {
      errorMessage.value = 'Необходимо согласиться с политикой конфиденциальности';
      return false;
    }

    return true;
  };

  const submitForm = async () => {
    // Проверяем валидность формы
    if (!validateForm()) {
      return;
    }

    isSubmitting.value = true;
    errorMessage.value = null;

    try {
      const data = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        roomCount: formData.roomCount,
        message: formData.message.trim() || null,
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

      // Make API call with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

      const response = await fetch('https://functions.yandexcloud.net/d4e4hnh3mvm8e2aks6ac', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Изменено с text/plain на application/json
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Пытаемся получить сообщение об ошибке от сервера
        let errorMsg = 'Ошибка при отправке формы';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          // Игнорируем ошибки парсинга
        }
        throw new Error(errorMsg);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Ошибка при обработке заявки');
      }

      // Отслеживаем успешную отправку в Яндекс.Метрике
      if (import.meta.client && window.ym) {
        window.ym(96122697, 'reachGoal', 'booking_form_submit', {
          apartment_id: formData.apartmentDetails?.id || 'general',
        });
      }

      // Show success message
      showSuccessModal.value = true;
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);

      if (error.name === 'AbortError') {
        errorMessage.value = 'Превышено время ожидания. Попробуйте еще раз.';
      } else if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage.value = 'Проблема с подключением к интернету. Проверьте соединение и попробуйте еще раз.';
      } else {
        errorMessage.value =
          error.message || 'Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону.';
      }

      throw error; // Rethrow to handle in component if needed
    } finally {
      isSubmitting.value = false;
    }
  };

  const closeSuccessModal = () => {
    showSuccessModal.value = false;
  };

  const clearError = () => {
    errorMessage.value = null;
  };

  return {
    // State
    formData,
    isSubmitting,
    showSuccessModal,
    errorMessage,

    // Actions
    setApartmentDetails,
    resetForm,
    submitForm,
    closeSuccessModal,
    validateForm,
    clearError,
  };
});
