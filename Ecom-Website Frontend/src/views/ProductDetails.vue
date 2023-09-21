<script>
    import { products } from '../fake-data'
    import NotFound from './NotFound.vue'
    export default {
        name: 'ProductsDetails',
        components: {
            NotFound
        },
        data() {
            return {
                product: products.find((p) => p.id === this.$route.params.id)
            }
        }
    }
</script>

<template>
    <div id="page-wrap" v-if="product">
        <div id="img-wrap">
            <img v-bind:src="product.imageUrl" />
        </div>
        <div id="product-details">
            <h1>{{ product.name }}</h1>
            <h3 id="price">{{ product.price }}kr</h3>
            <p>Betyg: {{ product.averageRating }}</p>
            <button id="add-to-cart">Lägg till i kundvagnen</button>
            <h4>Beskrivning</h4>
            <p>{{ product.description }}</p>
        </div>
    </div>
    <NotFound v-else />
</template>

<style scoped>
    #page-wrap {
        margin-top: 16px;
        padding: 16px;
        max-width: 600px;
    }

    #img-wrap {
        text-align: center;
    }

    img {
        width: 400px;
    }

    #product-details {
        padding: 16px;
        position: relative;
    }

    #add-to-cart {
        width: 100%;
    }

    #price {
        position: absolute;
        top: 24px;
        right: 16px;
    }
</style>
