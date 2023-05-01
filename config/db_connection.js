const mongoose = require('mongoose');
try {
    let conn = async () => {
        await mongoose.connect('mongodb+srv://krn0869:karan@cluster0.ys3bhdb.mongodb.net/?retryWrites=true&w=majority');
        
    }
    conn().then(() => {
        console.log('connected successfully');
    });
} catch (err) {
    console.log(err);
}

