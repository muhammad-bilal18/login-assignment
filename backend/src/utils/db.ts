import mongoose from 'mongoose';
import config from 'config';

export function connectToDatabase() {
    const url: string =  config.get('db') || 'mongodb://localhost/cloudinary'
    
    mongoose.connect(url)
        .then(() => {
            console.log(`Connected to ${url}`);
        })
        .catch((error) => {
            console.log(`Failed to connect to the database. Error: ${error.message}`);
        });
}