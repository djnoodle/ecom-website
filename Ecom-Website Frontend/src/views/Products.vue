<script>
    import axios from 'axios';
    import ProductsGrid from '../components/ProductsGrid.vue';

    export default {
        name: 'ProductsPage',
        components: {
            ProductsGrid
        },
        data() {
            return {
                products: [],
            }
        },
        async created() {
          await axios.get('http://localhost:8000/api/products')
            .then((result) => {
              console.log(result.data)
              this.products = result.data;
            })
            .catch((error) =>{
              console.log(error)
            })
        }
    }
</script>

<template>
    <div id="page-wrap">
        <ProductsGrid :products="products" />
    </div>
</template>
