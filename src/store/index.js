import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // data
    products: [],
    // {id, qty}

  },
  getters: { // computed properties
    productsCount() {
      // ...
    },
    availableProducts(state) {
      return state.products.filter(product => product.stock > 0)
    },
  },
  mutations: {
    setProducts(state, products) {
      // update products
      state.products = products
    },

    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      product.stock--
    }
  },
  actions: { // methods
    fetchProducts({commit}) {
      // make the call

      return new Promise((resolve, reject) => {
          shop.getProducts(products => {
            commit('setProducts', products)
            resolve()
            reject()
        }); 
      });          
    },
    addProductToCart (context, product) {
      if (product.stock > 0) {
        // find cartItem
        const cartItem = context.state.find(item => item.id === product.id)
        if (!cartItem) {
          // pushProductToCart
          context.commit('pushProductToCart', product.id)
        } else {
          // incrementItemQuantity
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementProductInventory', product)
      }
      
    }

  },
  modules: {
  }
})
