<template>
  <div class="product">
    <h2>{{ product.title }}</h2>
    <nav>
      <ul class="product__menu">
        <li v-for="(item, i) in menu" :key="i">
          <a>{{ item }}</a>
        </li>
      </ul>
    </nav>
    <div class="product__main">
      <img :src="product.image" alt="" />
      <div class="product__main_info">
        <span class="description">{{ product.description }}</span>
        <rating :rate="product.rating.rate" :count="product.rating.count" />
        <div class="buy">
          <p>{{ product.price }} $</p>
          <button>Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="./index.scss" scoped lang="scss"></style>
<script src="./index.js"></script>
