import {gql} from 'apollo-server'
// Define a schema
export const typeDefs = gql`

  # -------------------------------------------------------------------------------------  
  # Root Query Type
   type Query{
      # A simple query that returns a greeting message
       greet:String

       # Fetch All Users
       allusers:[User]

       # Fetch All Quotes
       allquotes:[Quotes]

       # Fetch all users along with their associated quotes
       users_with_quotes: [Users_With_Quotes] 

       # Fetch a specific user along with their quotes by user ID
       user_by_id(id:ID!): Users_With_Quotes

       # Fetch a specific quotes  by quote ID
       search_quotes_by_user_id(userId:ID!):[Quote]
   }

  # User type defining the structure of a User entity 
  type User{
    id:ID
    firstName: String
    lastName: String
    email: String
  }

  # Composite type for a User along with their associated quotes
  type Users_With_Quotes{
    id:ID
    firstName: String
    lastName: String
    email: String
    quotes:[Quotes] 
  }

  # Type defining the structure of a Quote entity (potential typo in naming)
  type Quotes{
    name: String
    by: ID!
  }

  # A similar structure to Quotes with slight differences in field types
  type Quote{
    name: String
    by: ID
  }

# -------------------------------------------------------------------------------------  

  # Root Mutation Type
   type Mutation {
       # Mutation to create a user by specifying details explicitly
       CreteUser(
           firstName: String!, 
           lastName: String!, 
           email: String!, 
           password: String!
       ): User

       # Mutation to create a user by passing a UserInput object
       CreteNewUser(newUser: UserInput!): User
   }

   # Input type for creating a new user (to pass complex objects as input)
   input UserInput {
       firstName: String!
       lastName: String!
       email: String!
       password: String!
   }
      
   
`;