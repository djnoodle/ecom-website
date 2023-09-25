import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/products'
        },
        {
            path: '/products',
            name: 'Products',
            component: () => import('../views/Products.vue')
        },
        {
            path: '/products/:id',
            name: 'Products details',
            component: () => import('../views/ProductDetails.vue')
        },
        {
            path: '/cart',
            name: 'Cart',
            component: () => import('../views/Cart.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../views/NotFound.vue')
        }
    ]
})

export default router
