<template>
  <div>
    <div v-for="p in products" :key="p.id">
      <h1>{{p.title}}</h1>
      <img src="http://localhost:5000/' + p.images[0]" :alt="p.title">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: [],
      numri: 0,
    };
  },
  methods: {
    getProducts() {
      axios
        .get("http://localhost:5000/products")
        .then((response) => {
          this.products = response.data;
          this.numri += this.products.length;
        })
        .catch((error) => {
          console.log("failed to fetch data " + error);
        });
    },
  },

  async created() {
    await this.getProducts();
  },
};
</script>

<style>
</style>