const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
};

const writeProducts = (data) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2));
};

const getAllProducts = (req, res) => {
    const products = readProducts();
    const limit = parseInt(req.query.limit) || products.length;
    res.json(products.slice(0, limit));
};

const getProductById = (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

const addProduct = (req, res) => {
    const products = readProducts();
    const newProduct = {
        id: Date.now().toString(),
        ...req.body,
        status: req.body.status !== undefined ? req.body.status : true
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const products = readProducts();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...req.body, id: products[productIndex].id };
        products[productIndex] = updatedProduct;
        writeProducts(products);
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

const deleteProduct = (req, res) => {
    let products = readProducts();
    products = products.filter(p => p.id !== req.params.pid);
    writeProducts(products);
    res.status(204).end();
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
