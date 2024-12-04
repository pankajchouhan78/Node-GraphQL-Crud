const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

// MongoDB Connection URL
const url = "mongodb://localhost:27017/moviesdb";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error(err));

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});


async function startServer() {
      await server.start(); // Ensure the server is started
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