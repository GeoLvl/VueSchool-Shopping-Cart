

const _products = [
    {"id": 1, "title": "Ipad 5 mini", "price": 490.90, "stock": 4},
    {"id": 2, "title": "Macbook Pro", "price": 2550.90, "stock": 8},
    {"id": 3, "title": "Macbook Air", "price": 1775.90, "stock": 7}
]

export default {
    getProducts (cb) {
        setTimeout(() => cb(_products), 100)
    },

    buyProducts (products, cb, errorCb) {
        setTimeout(() => {
            //simulate random checkout failure.
            (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
            ? cb()
            : errorCb()
        }, 100)
    }
}