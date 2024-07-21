const { MongoClient } = require('mongodb');

class MongoDatabase {
    constructor() {
        this.url = 'mongodb://localhost:27017/duolingo';
        this.client = null;
    }

    static instance() {
        if (!this._instance) {
            this._instance = new MongoDatabase();
        }
        return this._instance;
    }

    async connect() {
        if (!this.client) {
            try {
                this.client = await MongoClient.connect(this.url);
                console.log('Connected to MongoDB');
            } catch (error) {
                console.error('Failed to connect to MongoDB:', error);
                throw error;
            }
        }
        return this.client;
    }

    async disconnect() {
        if (this.client) {
            await this.client.close();
            console.log('Closed MongoDB connection');
            this.client = null;
        }
    }

    db() {
        if (this.client) {
            return this.client.db();
        } else {
            throw new Error('MongoDB client not connected.');
        }
    }
}

module.exports = MongoDatabase;
