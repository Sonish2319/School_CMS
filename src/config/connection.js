
import mysql from 'mysql2/promise';

export const api = {
    baseUrl: process.env.BASE_URL || "http://localhost:8000/api/",
    baseUrlPublic: process.env.BASE_URL_PUBLIC || "http://localhost:8000/"
};

export const database = {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    database: process.env.DB_DATABASE || "nextcms",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || ""
};

export const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection(database);
        return connection;
    } catch (error) {
        // console.error("Error connecting to the database:", error);
        throw error;
    }
};
