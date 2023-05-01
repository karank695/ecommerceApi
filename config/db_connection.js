const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '../.env' });
try {
    let conn = async () => {
        await mongoose.connect(process.env.MONGO_URI);
        
    }
    conn().then(() => {
        console.log('connected successfully');
    });
} catch (err) {
    console.log(err);
}

