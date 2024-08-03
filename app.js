const express = require("express");
const morgan = require('morgan');
require('colors');
const cors = require('cors');
const connectDb = require('./config/db')
const cookieParser = require("cookie-parser");


//controllerroutes
const userRoutes = require('./routes/users');
const fileRoutes = require('./routes/filemanager');
const productRouts = require('./routes/product');
const categoryRoutes = require('./routes/category');
const addressRoutes = require('./routes/address');
const couponRoutes = require('./routes/coupon');
const cartRoutes = require('./routes/cart');
const wishListRoutes = require('./routes/wishList');
require('dotenv').config();

//app
const app = express();

//db
connectDb();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


//routes 
app.use("/api", userRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/product', productRouts);
app.use('/api/category', categoryRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishListRoutes);


//port 
const port = process.env.PORT || 8080;

//server 
app.listen(port, () => {
    console.log(`Server is runnning on ${port}`.bgMagenta);
});