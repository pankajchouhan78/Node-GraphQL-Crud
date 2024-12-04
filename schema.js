const { gql } = require('apollo-server-express');
const Movie = require('./models/movie.js').Movies;

// GraphQL Type Definitions
const typeDefs = gql`
    type Movie {
        id: ID!
        name: String!
        producer: String!
        rating: Float!
    }

    type Query {
        getMovies: [Movie]
        getMovie(id: ID!): Movie 
    }

    type Mutation {
        addMovie(name: String!, producer: String!, rating: Float!): Movie
        updateMovie(id: ID!, name: String, producer: String, rating: Float): Movie
        deleteMovie(id: ID!): DeleteMovieResponse
    }

    type DeleteMovieResponse {
        message: String!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        // Fetch all movies from the database
        getMovies: () => {
            return Movie.find({}).exec();
        },

        // Fetch a single movie by its ID
        getMovie: (parent, args) => {
            return Movie.findById(args.id).exec();  // Use exec() to execute the query explicitly
        }
    },

    Mutation: {
        // Add a new movie to the database
        addMovie: (parent, args) => {
            const movie = new Movie({
                name: args.name,
                producer: args.producer,
                rating: args.rating
            });
            return movie.save();  // Save the new movie to the database
        },

        // Update an existing movie's details
        updateMovie: (parent, args) => {
            if (!args.id) {
                throw new Error('Movie ID is required');
            }

            const updateData = {};

            // Add provided fields to the updateData object
            if (args.name) updateData.name = args.name;
            if (args.producer) updateData.producer = args.producer;
            if (args.rating !== undefined) updateData.rating = args.rating;

            // Find the movie by ID and update it with new values
            return Movie.findOneAndUpdate(
                { _id: args.id },
                { $set: updateData },
                { new: true }  // Return the updated document
            ).exec()
            .then(updatedMovie => {
                if (!updatedMovie) {
                    throw new Error('Movie not found');
                }
                return updatedMovie;  // Return the updated movie
            })
            .catch(err => {
                console.error('Error updating movie:', err);
                throw new Error('Could not update movie');
            });
        },

        // Delete a movie by its ID
        deleteMovie: (parent, args) => {
            return Movie.deleteOne({ _id: args.id })
              .exec()
              .then(result => {
                if (result.deletedCount === 0) {
                  throw new Error('Movie not found');
                }
                return {
                  message: 'Movie deleted successfully',
                };
              })
              .catch(error => {
                throw new Error('Error deleting movie: ' + error.message);
              });
          }
    }
};

module.exports = { typeDefs, resolvers };
