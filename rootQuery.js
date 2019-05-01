const { GraphQLObjectType, GraphQLList, GraphQLInt } = require('graphql');
const {
  EventType,
  BookingType,
  UserInputType,
  AuthDataType
} = require('./types');
const Event = require('./models/Event');
const Booking = require('./models/Booking');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Query for events
    events: {
      type: new GraphQLList(EventType),
      async resolve(parent, args) {
        try {
          const events = await Event.find();
          return events;
        } catch (err) {
          throw err;
        }
      }
    },

    // Query for bookings
    bookings: {
      type: new GraphQLList(BookingType),
      async resolve(parent, args, req) {
        try {
          const { isAuth } = req;

          if (!isAuth) {
            throw new Error('Unauthenticated');
          }

          const bookings = await Booking.find();
          
          return bookings;
        } catch (err) {
          throw err;
        }
      }
    },

    // Query for login
    login: {
      type: AuthDataType,
      args: {
        user: { type: UserInputType }
      },
      async resolve(parent, args) {
        try {
          const { email, password } = args.user;
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error('User does not exist');
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Password is incorrect');
          }
          // Generate a token
          const token = jwt.sign(
            { id: user._id, email: user.email },
            config.get('jwtSecret'),
            { expiresIn: config.get('tokenExpiration') }
          );

          return {
            userId: user._id,
            token: token,
            tokenExpiration: config.get('tokenExpiration')
          };
        } catch (err) {
          throw err;
        }
      }
    }
  }
});

module.exports = RootQuery;
