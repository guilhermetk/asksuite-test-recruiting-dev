const express = require('express');

const inboundRoute = require('./routes/inbound');

const app = express();
app.use(express.json());
app.use(inboundRoute);

app.listen(3000);