const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/product'));

const discountProductRoutes = require("./routes/discountProduct");
app.use("/api/discountproducts", discountProductRoutes);

const weeklySpecialRoutes = require("./routes/weeklySpecial");
app.use("/api/weeklyspecial", weeklySpecialRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
