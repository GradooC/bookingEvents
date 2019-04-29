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
const User = require('./models/User');
const Event = require('./models/Event');

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    creator: {
      type: new GraphQLNonNull(UserType),
      resolve(parent, args) {
        return User.findById(parent.creator);
      }
    }
  })
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
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    createdEvents: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find({ creator: parent._id });
      }
    }
  })
});

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  }
});

module.exports = { EventType, EventInputType, UserType, UserInputType };
