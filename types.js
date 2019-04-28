const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql');

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const EventInputType = new GraphQLInputObjectType({
  name: 'EventInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    date: {
      type: GraphQLString,
      defaultValue: new Date().toISOString()
    }
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString }
  }
});

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  }
});

module.exports = { EventType, EventInputType, UserType, UserInputType };
