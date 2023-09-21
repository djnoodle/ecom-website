<script>
    import ProductsListItem from './ProductsListItem.vue'

    export default {
        name: 'ProductsList',
        props: ['products'],
        components: {
            ProductsListItem
        }
    }
</script>

<template>
    <div v-if="products.length > 0">
        <ProductsListItem
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>
    <p v-else>Varukorgen är tom!</p>
</template>

<style scoped></style>
