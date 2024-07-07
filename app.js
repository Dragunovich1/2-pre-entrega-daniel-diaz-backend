const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar WebSockets
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Ruta para vista home.handlebars
app.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json')));
    res.render('home', { title: 'Lista de Productos', products });
});

// Ruta para vista realTimeProducts.handlebars
app.get('/realtimeproducts', (req, res) => {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json')));
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
});

// Manejo de conexiones WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Emitir la lista de productos actualizada al cliente que se conecta
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json')));
    socket.emit('update-products', products);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
