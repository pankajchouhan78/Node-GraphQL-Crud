const express = require('express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schema');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key";

// MongoDB Connection URL
const url = "mongodb://localhost:27017/moviesdb";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error(err));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const { authorization } = req.headers;
        if (authorization) {
            try {
                const token = authorization.replace('Bearer ', '');
                const { userId } = jwt.verify(token, JWT_SECRET);
                return { userId };
            } catch (err) {
                throw new Error("Invalid token");
            }
        }
        return {};
    },
});

async function startServer() {
    await server.start();
    const app = express();
    app.use(bodyParser.json());
    app.use('*', cors());
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

// Start the server
startServer();
