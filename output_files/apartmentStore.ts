// store/apartmentStore.ts
import { defineStore } from 'pinia';
import { cards, cardsRewievs } from '~/utils/utils';

export interface ApartmentFilters {
  rooms: number | null;
  hasBalcony: boolean | null;
  minArea: number | null;
  maxArea: number | null;
}

export interface Apartment {
  id: string;
  address: string;
  description: string;
  fullDescription: string;
  rooms: number;
  images: string[];
  nearby?: string[];
  options: {
    balcony: boolean;
    scale: string;
    floor: string;
    floorMax: string;
  }[];
  mapLink: string;
  mapRoute: string;
}

export const useApartmentStore = defineStore('apartments', () => {
  // State
  const apartments = ref<Apartment[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const reviews = ref(cardsRewievs);

  // Filters
  const filters = reactive<ApartmentFilters>({
    rooms: null,
    hasBalcony: null,
    minArea: null,
    maxArea: null,
  });

  // Computed
  const filteredApartments = computed(() => {
    return apartments.value.filter((apartment) => {
      // Filter by room count
      if (filters.rooms !== null && apartment.rooms !== filters.rooms) {
        return false;
      }

      // Filter by balcony
      if (filters.hasBalcony !== null && apartment.options[0].balcony !== filters.hasBalcony) {
        return false;
      }

      // Filter by area
      const apartmentArea = parseFloat(apartment.options[0].scale);
      if (filters.minArea !== null && apartmentArea < filters.minArea) {
        return false;
      }
      if (filters.maxArea !== null && apartmentArea > filters.maxArea) {
        return false;
      }

      return true;
    });
  });

  // Actions
  function fetchApartments() {
    isLoading.value = true;
    error.value = null;

    try {
      // Convert the cards data to our Apartment interface
      apartments.value = cards.map((card, index) => ({
        id: index.toString(), // Generate IDs based on array index
        address: card.address,
        description: card.description,
        fullDescription: card.fullDescription,
        rooms: card.room,
        images: card.images,
        nearby: card.nearby,
        options: card.options,
        mapLink: card.mapLink,
        mapRoute: card.mapRoute,
      }));

      return Promise.resolve(apartments.value);
    } catch (err) {
      error.value = 'Ошибка при загрузке данных о квартирах';
      console.error('Error fetching apartments:', err);
      return Promise.reject(err);
    } finally {
      isLoading.value = false;
    }
  }

  function getApartmentById(id: string) {
    return apartments.value.find((apt) => apt.id === id);
  }

  // Filter actions
  function setRoomFilter(rooms: number | null) {
    filters.rooms = rooms;
  }

  function setBalconyFilter(hasBalcony: boolean | null) {
    filters.hasBalcony = hasBalcony;
  }

  function setAreaFilter(min: number | null, max: number | null) {
    filters.minArea = min;
    filters.maxArea = max;
  }

  function resetFilters() {
    filters.rooms = null;
    filters.hasBalcony = null;
    filters.minArea = null;
    filters.maxArea = null;
  }

  return {
    // State
    apartments,
    isLoading,
    error,
    reviews,
    filters,

    // Computed
    filteredApartments,

    // Actions
    fetchApartments,
    getApartmentById,
    setRoomFilter,
    setBalconyFilter,
    setAreaFilter,
    resetFilters,
  };
});
