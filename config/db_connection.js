const mongoose = require('mongoose');
require('dotenv').config();
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

