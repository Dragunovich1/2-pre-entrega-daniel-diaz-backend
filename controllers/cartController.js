const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../data/carts.json');
const productsFilePath = path.join(__dirname, '../data/products.json');

const readCarts = () => {
    return JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
};

const writeCarts = (data) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, 2));
};

const readProducts = () => {
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
};

const createCart = (req, res) => {
    const carts = readCarts();
    const newCart = {
        id: Date.now().toString(),
        products: []
    };
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
};

const getCartProducts = (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
};

const addProductToCart = (req, res) => {
    const carts = readCarts();
    const products = readProducts();
    const cart = carts.find(c => c.id === req.params.cid);
    const product = products.find(p => p.id === req.params.pid);

    if (cart && product) {
        const cartProduct = cart.products.find(p => p.product === req.params.pid);
        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ product: req.params.pid, quantity: 1 });
        }
        writeCarts(carts);
        res.status(201).json(cart);
    } else {
        res.status(404).json({ message: 'Carrito o producto no encontrado' });
    }
};

module.exports = {
    createCart,
    getCartProducts,
    addProductToCart
};
