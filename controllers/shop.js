const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetcAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'index',
            path: '/'
        });
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetcAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'shop',
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetcAll(products => {
            const cartProduct = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProduct.push({productData: product, qty:cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProduct
            });
        });
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
}

exports.getCheckout = (req, res, next) => {
    req.render('shop/checkout', {
        pageTitle: 'Your Checkout',
        path: '/checkout'
    })
}