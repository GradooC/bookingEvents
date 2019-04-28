const { GraphQLObjectType, GraphQLList } = require('graphql');
const { EventType } = require('./types');
const Event = require('./models/Event');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find()
          .then(events => events)
          .catch(err => {
            throw err;
          });
      }
    }
  }
});

module.exports = RootQuery;
