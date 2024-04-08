<template>
  <div class="app w-screen h-screen" :class="bgImage">
    <main>
      <h4 class="flex justify-center mb-8 text-3xl text-white font-bold">
        {{ WELCOME_TITLE }}
      </h4>

      <Searchbar ref="searchbar" @search="handleFetchWeatherData" />
      <Loader v-if="state.loading" />
      <DisplayError v-else-if="state.error">
        <template #error>
          {{ state.error.message }}
        </template></DisplayError
      >
      <div v-else>
        <div
          class="flex flex-col justify-center items-center space-y-6"
          v-if="state.weather && state.weather.main"
        >
          <div>
            <p class="text-5xl text-white font-semibold">
              {{ cityAndcontry }}
            </p>
            <p class="text-white italic text-xl font-semibold text-center">
              {{ formatDate() }}
            </p>
          </div>
          <div
            class="h-[200px] w-[350px] rounded-xl bg-[#FFFFFF7F] flex flex-col justify-center items-center shadow-own"
          >
            <span
              class="text-[70px] text-white font-bold text-center temp-shadow-span"
              >{{ roundTemperature }}°c</span
            >
            <div v-if="state.weather">
              <img :src="src" alt="Weather icon" />
            </div>
            <span class="text-white font-bold text-lg"
              >Humidity: {{ humidity }}</span
            >
          </div>
        </div>
        <div class="flex flex-col space-y-4">
          <div
            class="flex flex-col items-center"
            v-if="state.weather && state.weather"
          >
            <span class="italic text-white font-normal text-[55px]">{{
              state.weather.weather[0].main
            }}</span>
            <span
              class="italic font-medium text-sm"
              :class="
                state.weather.main.temp < 25 ? 'text-yellow-400' : 'text-white'
              "
              >{{ state.weather.weather[0].description }}</span
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { Weather, GetWeatherError, SearchBar } from "./types/weather";
import Searchbar from "./components/Searchbar.vue";
import Loader from "./components/Loader.vue";
import { WELCOME_TITLE, CITY_NOT_FOUND } from "./constants";
import { formatDate } from "./utils/date";
import DisplayError from "./components/DisplayError.vue";

type State = {
  appid: string;
  url_base: string;
  weather: Weather | null;
  loading: boolean;
  error: GetWeatherError | null;
};

const APPID = "b8de8503e7012ee121a886385eddf0c1";
const state = reactive<State>({
  appid: APPID,
  url_base: "https://api.openweathermap.org/data/2.5/",
  weather: null,
  loading: false,
  error: null,
});

const searchbar = ref<SearchBar>({ queryStr: "" });

const src = computed((): string => {
  return state.weather == null
    ? ""
    : `http://openweathermap.org/img/w/${state.weather.weather[0].icon}.png`;
});

const roundTemperature = computed((): number => {
  return state.weather !== null ? Math.round(state.weather.main.temp) : 0;
});

const humidity = computed((): string => {
  return state.weather !== null ? `${state.weather.main.humidity}%` : "0%";
});

const bgImage = computed((): string => {
  return state.weather && state.weather.main.temp > 25 ? "hot" : "";
});

const cityAndcontry = computed((): string => {
  return state.weather !== null
    ? `${state.weather.name} ,  ${state.weather.sys.country}`
    : CITY_NOT_FOUND;
});

async function handleFetchWeatherData(queryStr: string): Promise<void> {
  try {
    state.loading = true;
    let response = await fetch(
      `${state.url_base}weather?q=${queryStr}&units=metric&APPID=${state.appid}`
    );

    if (response.ok) {
      state.weather = await response.json();
      state.error = null;
      searchbar.value.queryStr = "";
    } else {
      state.error = await response.json();
    }
  } catch (error) {
    throw new Error(error.message);
  } finally {
    state.loading = false;
  }
}
</script>

<style scoped>
body {
  font-family: "Courier New", Courier, monospace;
}

.app {
  background-image: url("assets/cold.jpg");
  background-size: cover;
  background-position: center;
  transition: 0.2s;
  height: 100%;
}

.app.hot {
  background-image: url("assets/hot.jpg");
}

main {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25) rgba(0, 0, 0, 0.75)
  );
  min-height: 100vh;
  padding: 25px;
}

.temp-shadow-span {
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
