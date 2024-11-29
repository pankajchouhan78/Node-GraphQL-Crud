import { users, quotes } from '../fakedb.js'; // Importing mock data
import { randomBytes } from 'crypto'; // Importing crypto module for generating random IDs

// Define resolvers for GraphQL schema
export const resolvers = {
    Query: {
        // Resolver for the 'greet' query - returns a simple greeting message
        greet: () => {
            return "Hello world";
        },

        // Resolver for fetching all users
        allusers: () => users,

        // Resolver for fetching all quotes
        allquotes: () => quotes,

        // Resolver for fetching all users with associated quotes
        users_with_quotes: () => users,

        // Resolver for fetching a single user by their ID
        user_by_id: (_, { id }) => users.find(user => user.id == id),

        // Resolver for searching and fetching quotes by a specific user ID
        search_quotes_by_user_id: (_, { userId }) => quotes.filter(quote => quote.by == userId),
    },

    // Resolver for the 'Users_With_Quotes' type
    Users_With_Quotes: {
        // Fetches quotes associated with a user
        quotes: (ur) => quotes.filter(quote => quote.by == ur.id),
    },

    Mutation: {
        // Mutation to create a new user by specifying details explicitly
        CreteUser: (_, { firstName, lastName, email, password }) => {
            // Generate a random ID for the new user
            const id = randomBytes(5).toString('hex');

            // Push the new user into the mock 'users' database
            users.push({
                id, 
                firstName, 
                lastName, 
                email,  
                password,
            });

            // Return the newly created user
            return users.find(user => user.id == id);
        },

        // Mutation to create a new user by passing a UserInput object
        CreteNewUser: (_, { newUser }) => {
            // Generate a random ID for the new user
            const id = randomBytes(5).toString('hex');

            // Push the new user into the mock 'users' database, spreading the input object
            users.push({
                id,
                ...newUser,
            });

            // Return the newly created user
            return users.find(user => user.id == id);
        },
    },
};
