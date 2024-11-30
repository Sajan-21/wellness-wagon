const express = require('express');
const app = express();
const mongoConnect = require('./db/connect');
mongoConnect();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const userRouter = require('./routes/user-routes');
const authRouter = require('./routes/auth-routes');
const productRouter = require('./routes/product-routes');
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname,'../client')));
app.use(express.urlencoded({extended : true}));
app.use(express.json({limit : "10240mb"}));
app.use(userRouter);
app.use(authRouter);
app.use(productRouter);
app.use('/uploads',express.static("./uploads"));

app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
});