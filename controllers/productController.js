const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const writeProducts = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

const getProducts = (req, res) => {
    const products = readProducts();
    res.json(products);
};

const getProductById = (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === req.params.pid);
    res.json(product);
};

const addProduct = (req, res) => {
    const products = readProducts();
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    writeProducts(products);

    req.io.emit('updateProducts', products); // Emitir evento de actualización
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...req.body };
        writeProducts(products);

        req.io.emit('updateProducts', products); // Emitir evento de actualización
        res.json(products[productIndex]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
};

const deleteProduct = (req, res) => {
    const products = readProducts();
    const updatedProducts = products.filter(p => p.id !== req.params.pid);
    writeProducts(updatedProducts);

    req.io.emit('updateProducts', updatedProducts); // Emitir evento de actualización
    res.status(204).send();
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
