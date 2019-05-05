const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const RootQuery = require('./rootQuery');
const RootMutation = require('./rootMutation');
const auth = require('./middleware/auth');

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

const app = express();

// Allow cross-origin
app.use(cors());

// BodyParser Middleware
app.use(express.json());

// Auth middleware
app.use(auth);

// DB Config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
