const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        const clusterName = process.env.MONGO_URI.split('@')[1].split('.')[0]
        
        console.log(`Connected to the database "${conn.connection.db.databaseName}" in the cluster "${clusterName}"`);

    } 
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb;