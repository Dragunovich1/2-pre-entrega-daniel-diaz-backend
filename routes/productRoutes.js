const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json')));
    res.json(products);
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json')));
    const newProduct = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock),
        category: req.body.category,
        status: true
    };
    products.push(newProduct);
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null, 2));

    // Emitir evento de producto nuevo
    req.io.emit('update-products', products);

    res.status(201).json(newProduct);
});

// Ruta para eliminar un producto
router.delete('/:id', (req, res) => {
    let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json')));
    products = products.filter(product => product.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null, 2));

    // Emitir evento de eliminación de producto
    req.io.emit('update-products', products);

    res.status(200).json({ message: 'Producto eliminado' });
});

module.exports = router;
