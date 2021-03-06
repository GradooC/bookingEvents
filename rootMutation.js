const {
  EventType,
  EventInputType,
  UserType,
  UserInputType,
  BookingType
} = require('./types');
const Event = require('./models/Event');
const User = require('./models/User');
const Booking = require('./models/Booking');

const bcrypt = require('bcryptjs');
const { GraphQLObjectType, GraphQLID } = require('graphql');

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    // Create Event Mutation
    createEvent: {
      type: EventType,
      args: {
        event: { type: EventInputType }
      },
      async resolve(parent, args, req) {
        try {
          const { userId, isAuth } = req;
          const { _id, title, description, price, date } = args.event;

          if (!isAuth) {
            throw new Error('Unauthenticated');
          }

          const event = new Event({
            title,
            description,
            price,
            creator: userId
          });

          // Pass event to user.createdEvents
          const user = await User.findById(userId);
          if (!user) {
            throw new Error('User not found');
          }
          user.createdEvents.push(event);
          await user.save();

          // Save event
          const newEvent = await event.save();

          return newEvent;
        } catch (err) {
          throw err;
        }
      }
    },

    // Create User Mutation
    createUser: {
      type: UserType,
      args: {
        user: { type: UserInputType }
      },
      async resolve(parent, args) {
        const { email, password } = args.user;
        try {
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            throw new Error('User already exists');
          }

          const hashedPassword = await bcrypt.hash(password, 12);

          const user = new User({
            email,
            password: hashedPassword
          });

          const newUser = await user.save();

          // Set returned password to null for security purpose
          return { ...newUser._doc, password: null };
        } catch (err) {
          throw err;
        }
      }
    },

    // Book Event Mutation
    bookEvent: {
      type: BookingType,
      args: {
        eventId: { type: GraphQLID }
      },
      async resolve(parent, args, req) {
        try {
          const { userId, isAuth } = req;
          const { eventId } = args;

          if (!isAuth) {
            throw new Error('Unauthenticated');
          }

          const event = await Event.findOne({ _id: eventId });

          const booking = new Booking({
            userId: userId,
            eventId: event._id
          });

          const res = await booking.save();
          return res;
        } catch (err) {
          throw err;
        }
      }
    },

    //Cancel Booking Mutation
    cancelBooking: {
      type: EventType,
      args: {
        bookingId: { type: GraphQLID }
      },
      async resolve(parent, args, req) {
        try {
          const { isAuth } = req;
          const { bookingId } = args;

          if (!isAuth) {
            throw new Error('Unauthenticated');
          }

          const deletedBooking = await Booking.findOneAndDelete({
            _id: bookingId
          }).populate('eventId');
          return deletedBooking.eventId;
        } catch (err) {
          throw err;
        }
      }
    }
  }
});

module.exports = RootMutation;
