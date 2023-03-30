<template>
  <div class="catalog">
    <linear-activity v-if="globalRequestFlag" />
    <filters />
    <div class="catalog__products">
      <card
        v-for="item in productsList"
        :key="item.id"
        :product="item"
        @click.native="selectProduct(item)"
      />
    </div>
  </div>
</template>
<style src="./index.scss" scoped lang="scss"></style>
<script src="./index.js"></script>
