import mongoose from 'mongoose';
import colors from 'colors'

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected on host: ${mongoose.connection.host.cyan}`);
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        // You might want to throw the error here to stop the application from continuing
        throw error;
    }
};

export default connectdb;
