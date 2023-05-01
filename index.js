const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.urlencoded({
    extended: true
}));
const db = require('./config/db_connection');
app.use('/', require('./routers'));
app.listen(PORT, () => {
    console.log(`I am listening at port ${PORT}`);
})