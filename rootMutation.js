const { EventType, EventInputType } = require('./types');
const Event = require('./models/Event');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createEvent: {
      type: EventType,
      args: {
        event: { type: EventInputType }
      },
      resolve(parent, args) {
        const { _id, title, description, price, date } = args.event;

        const event = new Event({
          title,
          description,
          price
        });

        return event
          .save()
          .then(res => {
            console.log(res);
            return res;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    }
  }
});

module.exports = RootMutation;
