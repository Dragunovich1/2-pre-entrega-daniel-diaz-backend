const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../data/carts.json');

const readCarts = () => {
    const data = fs.readFileSync(cartsFilePath);
    return JSON.parse(data);
};

const writeCarts = (carts) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

const createCart = (req, res) => {
    const carts = readCarts();
    const newCart = { id: Date.now(), products: [] };
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
};

const getCartById = (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === req.params.cid);
    res.json(cart);
};

const addProductToCart = (req, res) => {
    const carts = readCarts();
    const cartIndex = carts.findIndex(c => c.id === req.params.cid);
    if (cartIndex !== -1) {
        const { pid } = req.params;
        const existingProduct = carts[cartIndex].products.find(p => p.product === pid);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            carts[cartIndex].products.push({ product: pid, quantity: 1 });
        }
        writeCarts(carts);
        res.json(carts[cartIndex]);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart
};
