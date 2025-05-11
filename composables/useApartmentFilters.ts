// composables/useApartmentFilters.ts
import { ref, computed, reactive } from 'vue';
import type { Ref } from 'vue';
import type { Apartment, ApartmentFilters } from '~/store/apartmentStore';

export const useApartmentFilters = (apartments: Ref<Apartment[]>) => {
  const isTransitioning = ref(false);
  const showSkeleton = ref(false);
  const filters = reactive<ApartmentFilters>({
    rooms: null,
    hasBalcony: null,
    minArea: null,
    maxArea: null,
  });

  // Filtered apartments
  const filteredApartments = computed(() => {
    if (showSkeleton.value) return [];

    return apartments.value.filter((apartment) => {
      if (filters.rooms !== null && apartment.rooms !== filters.rooms) {
        return false;
      }
      if (filters.hasBalcony !== null && apartment.options[0].balcony !== filters.hasBalcony) {
        return false;
      }
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

  // Apply filters with transition
  const applyFilters = async (newFilters: Partial<ApartmentFilters>) => {
    isTransitioning.value = true;
    showSkeleton.value = true;

    // Apply new filters
    Object.assign(filters, newFilters);

    // Simulate data processing time
    await new Promise((resolve) => setTimeout(resolve, 300));

    showSkeleton.value = false;
    await nextTick();
    isTransitioning.value = false;
  };

  // Individual filter setters
  const setRoomFilter = (rooms: number | null) => {
    applyFilters({ ...filters, rooms });
  };

  const setBalconyFilter = (hasBalcony: boolean | null) => {
    applyFilters({ ...filters, hasBalcony });
  };

  const setAreaFilter = (minArea: number | null, maxArea: number | null) => {
    applyFilters({ ...filters, minArea, maxArea });
  };

  const resetFilters = () => {
    applyFilters({
      rooms: null,
      hasBalcony: null,
      minArea: null,
      maxArea: null,
    });
  };

  return {
    filters,
    filteredApartments,
    isTransitioning,
    showSkeleton,
    setRoomFilter,
    setBalconyFilter,
    setAreaFilter,
    resetFilters,
  };
};
