<script>
    import { cartItems } from '../fake-data'
    import ProductsList from '../components/ProductsList.vue'
    export default {
        name: 'Cart',
        components: {
            ProductsList
        },
        data() {
            return {
                cartItems
            }
        },
        computed: {
            totalPrice() {
                return this.cartItems.reduce(
                    (sum, item) => sum + Number(item.price),
                    0
                )
            }
        }
    }
</script>

<template>
    <div id="page-wrap">
        <h1>Kundvagn</h1>
        <ProductsList :products="cartItems" />
        <h3 id="total-price">Totalt: {{ totalPrice }}kr</h3>
        <button id="checkout-button">Till kassan</button>
    </div>
</template>

<style scoped>
    h1 {
        border-bottom: 1px solid black;
        margin: 0;
        margin-top: 16px;
        padding: 16px;
    }

    #total-price {
        padding: 16px;
        text-align: right;
    }

    #checkout-button {
        width: 100%;
    }
</style>
