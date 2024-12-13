const { gql } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('./models/user');

const JWT_SECRET = "your_secret_key";
const nodemailer = require('nodemailer');

var mailOptions = {
  from: 'pankajchouhan.work@gmail.com',
  to: 'pankaj787975@gmail.com',
  subject: 'Sending Email using Node.js',
  html: `<body>  
    <h2>That Was Easy!</h2>  
    <p>Hi <strong>Pankaj</strong>,</p>  
    <p>I just wanted to share how easy it was to <em>[describe the task, activity, or experience]</em>! It was surprisingly straightforward, and I really enjoyed it.</p>  
    <p>Have you ever tried <em>[describe the task, activity, or experience]</em>? I think you would find it just as easy and fun!</p>  
    <p>Best,<br>  
    <strong>testuser</strong></p>  
 
</body>  `
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pankajchouhan.work@gmail.com',
    pass: 'kutg cyzf rymk vgso'
  }
});

// GraphQL Schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type SendEmail{
    message:String
  }

  type Query {
    me: User
    sendemail:SendEmail
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me: async (_, __, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
      return await Users.findById(userId);
    },

    sendemail: async () => {
      try {
        const info = await new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              reject(error);
            } else {
              resolve(info);
            }
          });
        });
        return { message: "Email sent"};
      } catch (error) {
        console.error("Error sending email:", error);
        return { message: error.message };
      }
    }
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await Users.findOne({ email });
      if (existingUser) throw new Error("User already exists");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Users({ username, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await Users.findOne({ email });
      if (!user) throw new Error("Invalid email or password");
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid email or password");
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return { token, user };
    },
  },
};

module.exports = { typeDefs, resolvers };
