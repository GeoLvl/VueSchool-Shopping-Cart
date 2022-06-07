<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="loading">
        <ul v-else>
            <li v-for='product in products' :key="product.id">
                {{ product.title }} - {{ product.price | currency }} - {{ product.stock }}
                    <button :disabled="!productIsInStock(product)"
                    @click="addProductToCart(product)">Add to cart</button>
                </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'


    export default {
        data() {
            return {
                loading: false
            }
        },

        computed: {
            ...mapState({
                products: state => state.products
            }),

            ...mapGetters({
                productIsInStock: 'productIsInStock'
            }),

            productIsInStock() {
                return this.$store.getters.productIsInStock
            }
        },
        methods: {
            ...mapActions({
                fetchProducts: 'fetchProducts',
                addProductToCart: 'addProductToCart'
            }),
        },
        created() {
            this.loading = true
            this.fetchProducts()
            .then(() => this.loading = false)
        }
    }
</script>

<style scoped>
</style>