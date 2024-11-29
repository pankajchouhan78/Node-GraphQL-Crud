# GraphQL API with Node.js and MongoDB

## Overview

GraphQL is a new API standard invented and developed by Facebook. It is an open-source server-side technology, now maintained by a large community of companies and individuals from all over the world. It is also an execution engine that works as a data query language and is used to fetch declarative data.

The objective of developing GraphQL was to optimize RESTful API calls and provide a flexible, robust, and more efficient alternative to REST. GraphQL is a data query and manipulation language for your API.

---

### **Advantages of GraphQL Over REST**
- **Fetch Only What You Want**: Avoid over-fetching or under-fetching data.
- **Single API Endpoint**: Use one endpoint to fetch different datasets as per need.
- **Lightweight API Calls**: Fetch only the required data instead of fetching all and filtering it in the frontend.

---

## **Objective**
The objective of this project is to create an API app in Node.js that uses GraphQL API endpoints to:
- Fetch data
- Update data
- Delete data
- Insert data in a MongoDB database

This project will guide you through 3 simple steps to create a GraphQL API:

1. **Create a MongoDB Database and Collection**
2. **Create GraphQL Queries in Node.js to Interact with MongoDB**
3. **Create a Node.js Apollo Server to Execute CRUD with GraphQL**

> We will focus more on Steps 2 and 3. Note that we create GraphQL queries first and then the Node.js server. This helps us understand how to link our GraphQL queries with MongoDB and the Node.js Apollo server.

---

### **GitHub Repository**

For reference, you can find the full project [here](https://github.com/RaheelShaikh/graphql-nodejs-project).

---

## Step 1: Create a MongoDB Database and Collection

1. Create a MongoDB database named `products`.
2. Create a collection named `productlists`.
3. Add the following fields to the collection:
   - `id`: Unique identifier (ID)
   - `category`: String (required)
   - `productName`: String (required)
   - `price`: Integer (required)
   - `colors`: Array of strings (optional)

This collection will serve as the basis for our CRUD operations.

---

## Step 2: Create GraphQL Queries in Node.js to Interact with MongoDB

### **Setup Project**

1. Create a new project folder named `GraphQLNodeJS`.
2. Initialize a Node.js project:
   ```bash
   npm init
