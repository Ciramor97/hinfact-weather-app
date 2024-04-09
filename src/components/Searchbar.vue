<script setup lang="ts">
import { ref } from "vue";

const queryStr = ref<string>("");

const emit = defineEmits<{
  (e: "search", queryStr: string, isEnter?: boolean): void;
}>();

function searchCityWithEnter(event: any) {
  if (event.key == "Enter") searchCity();
}

function searchCity(): void {
  emit("search", queryStr.value);
  // queryStr.value = "";
}

defineExpose({
  queryStr,
});
</script>

<template>
  <div class="w-full flex mb-8">
    <input
      type="text"
      class="search-input"
      v-model="queryStr"
      placeholder="Rechercher par ville"
      @keydown="searchCityWithEnter"
    />

    <button
      class="bg-orange-600 px-4 md:p-0  sm:w-1/6 md:max-w-1/6  ml-5 rounded-md text-white font-bold"
      @click="searchCity"
    >
      Rechercher
    </button>
  </div>
</template>

<style scoped>
.search-input {
  display: block;
  width: 80%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
  appearance: none;
  border: none;
  background: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  transition: 0.4s;
}

::placeholder {
  color: black;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Edge 12-18 */
  color: black;
}

.search-input:focus {
  border-radius: 6px 0px 16px 0px;
}
</style>
