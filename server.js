const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();
app.use(express.json());

const adminRoutes = require('./routes/admin');
const patientRoutes = require('./routes/patient');
app.use('/admin', adminRoutes);
app.use('/patient', patientRoutes);

app.listen(port, () => console.log(`listening at port ${port}`));