<template>
  <div class="input-select">
    <div class="input-select__label" @click="isOpen = !isOpen">
      <h4>{{ title }}</h4>
      <div :class="{ 'open-select': isOpen }">
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.61989 6.06106C5.50762 6.06106 5.39525 6.0183 5.30954 5.93288L0.919904 1.55787C0.748379 1.38692 0.748379 1.11009 0.919904 0.93925C1.09143 0.768406 1.36918 0.768297 1.5406 0.93925L5.61989 5.00494L9.69917 0.93925C9.8707 0.768297 10.1485 0.768297 10.3199 0.93925C10.4913 1.1102 10.4914 1.38703 10.3199 1.55787L5.93023 5.93288C5.84453 6.0183 5.73215 6.06106 5.61989 6.06106Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
    <transition name="fade">
      <div class="input-select__checkbox-size" v-if="isOpen">
        <div v-for="(title, i) in filterData" :key="i">
          <input
            :type="type"
            :name="title"
            :id="title"
            :value="title"
            v-model="selectedItems"
          />
          <label :for="title">{{ title }}</label>
        </div>
      </div>
    </transition>
  </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
<script src="./index.js"></script>
