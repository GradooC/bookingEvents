const { GraphQLObjectType, GraphQLList } = require('graphql');
const { EventType, BookingType } = require('./types');
const Event = require('./models/Event');
const Booking = require('./models/Booking');

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
    },
    bookings: {
      type: new GraphQLList(BookingType),
      async resolve(parent, args) {
        try {
          const bookings = await Booking.find();
          return bookings
        } catch (error) {
          throw err;
        }
      }
    }
  }
});

module.exports = RootQuery;
