import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // data
    products: [],
    // {id, qty}
    cart: [],
    checkoutStatus: null

  },
  getters: { // computed properties
    availableProducts(state) {
      return state.products.filter(product => product.stock > 0)
    },

    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal(state, getters) {
      let total = 0
      getters.cartProducts.forEach(product => {
        total += product.price * product.quantity
      });
      return total
    },

    productIsInStock() {
      return (product) => {
        return product.stock > 0
      }
    }
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

    decrementProductStock (state, product) {
      product.stock--
    },

    setCheckoutStatuses (state, status) {
      state.checkoutStatus = status
    },

    emptyCart(state) {
      state.cart = []
    }
  },
  actions: { // methods
    fetchProducts({commit}) {
      // make the call

      return new Promise((resolve, reject) => {
          shop.getProducts(products => {
            commit('setProducts', products)
            resolve()
            reject() //weird
        }); 
      });          
    },

    addProductToCart (context, product) {
      if (product.stock > 0) {
        // find cartItem
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          // pushProductToCart
          context.commit('pushProductToCart', product.id)
        } else {
          // incrementItemQuantity
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementProductStock', product)
      }      
    },

    checkout({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }

  },
  modules: {
  }
})
