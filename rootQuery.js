const { GraphQLObjectType, GraphQLList } = require('graphql');
const { EventType } = require('./types');
const Event = require('./models/Event');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    events: {
      type: new GraphQLList(EventType),
      async resolve(parent, args) {
        try {
          const events = await Event.find();
          return events;
        } catch (error) {
          throw err;
        }
      }
    }
  }
});

module.exports = RootQuery;
