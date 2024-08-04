<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useCity } from '~/composables/useCityStore';
import { useTrip } from '~/composables/useTrip';
import type { City, Trip } from '~/types';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const isMobileMenuOpen = ref(false);
    const isUserMenuOpen = ref(false);
    const cities = ref<City[]>([]);
    const trips = ref<Trip[]>([]);
    const isDropdownOpen = ref<string | null>(null);

    const { fetchFirstCities } = useCity();
    const { fetchFirstUniqueTrips } = useTrip();

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const toggleUserMenu = () => {
      isUserMenuOpen.value = !isUserMenuOpen.value;
    };

    const toggleDropdown = (menu: string | null) => {
      isDropdownOpen.value = isDropdownOpen.value === menu ? null : menu;
    };

    const handleClickOutside = (event: Event) => {
      const userMenu = document.getElementById('user-menu-button');
      const dropdownMenu = document.querySelector('.dropdown-menu');

      if (
        userMenu &&
        !userMenu.contains(event.target as Node) &&
        dropdownMenu &&
        !dropdownMenu.contains(event.target as Node)
      ) {
        isUserMenuOpen.value = false;
      }
    };

    const loadCitiesAndTrips = async () => {
      cities.value = await fetchFirstCities(4);
      trips.value = await fetchFirstUniqueTrips(4);
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      loadCitiesAndTrips();
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      isMobileMenuOpen,
      isUserMenuOpen,
      isDropdownOpen,
      toggleMobileMenu,
      toggleUserMenu,
      toggleDropdown,
      cities,
      trips,
    };
  },
});
</script>

<template>
  <nav class="bg-green-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Mobile menu button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="toggleMobileMenu"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!isMobileMenuOpen"
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              v-else
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Logo -->
        <div class="flex items-center justify-center sm:justify-start flex-1 sm:flex-none">
          <div class="flex-shrink-0">
            <img
              class="h-8 w-auto logo"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
        </div>

        <!-- Navigation links (hidden on mobile) -->
        <div class="hidden sm:flex sm:items-center sm:justify-center sm:flex-1">
          <div class="flex space-x-4 items-center	">
            <div class="relative group" @mouseleave="toggleDropdown(null)" style="margin-top: -2px;">
              <a
                href="#"
                class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
                @mouseover="toggleDropdown('viajes')"
                @click="toggleDropdown('viajes')"
                >Viajes</a
              >
              <div
                v-if="isDropdownOpen === 'viajes'"
                class="absolute left-0 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <ul>
                  <li
                    v-for="trip in trips"
                    :key="trip.id"
                    class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {{ trip.destination }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="relative group" @mouseleave="toggleDropdown(null)" style="margin-top: -2px;" >
              <a
                href="#"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                @mouseover="toggleDropdown('ciudades')"
                @click="toggleDropdown('ciudades')"
                >Ciudades</a
              >
              <div
                v-if="isDropdownOpen === 'ciudades'"
                class="absolute left-0 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <ul>
                  <li
                    v-for="city in cities"
                    :key="city.id"
                    class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {{ city.name }}
                  </li>
                </ul>
              </div>
            </div>
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >Actividades</a
            >
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >Puntos de interés</a
            >
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >Hoteles</a
            >
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >Vuelos</a
            >
          </div>
        </div>

        <!-- User menu -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>

          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                @click="toggleUserMenu"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>

            <div
              v-if="isUserMenuOpen"
              class="dropdown-menu absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                >Your Profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-1"
                >Settings</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
                >Sign out</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="isMobileMenuOpen" class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a
          href="#"
          class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
          aria-current="page"
          >Dashboard</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Team</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Projects</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Calendar</a
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
.wrapper-nav {
  max-width: 1400px;
  margin: 0 auto;
}
</style>

  
  <style scoped>
  nav{
    background-color: rgb(20 61 35);
  }
  .wrapper-nav {
    max-width: 1400px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
      .logo{
      margin-right: 30px;
  }
  }
  </style>
  