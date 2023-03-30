<template>
  <div class="card">
    <img :src="product.image" class="card__image" />
    <div class="card__info">
      <h5>{{ product.title }}</h5>
      <div class="card__info-indicators">
        <p>{{ product.price }} $</p>
        <rating :rate="product.rating.rate" :count="product.rating.count" />
      </div>
    </div>
  </div>
</template>
<style src="./index.scss" scoped lang="scss"></style>
<script src="./index.js"></script>
