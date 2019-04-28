const {
  EventType,
  EventInputType,
  UserType,
  UserInputType
} = require('./types');
const Event = require('./models/Event');
const User = require('./models/User');

const bcrypt = require('bcryptjs');
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
      async resolve(parent, args) {
        const { _id, title, description, price, date } = args.event;

        try {
          const event = new Event({
            title,
            description,
            price,

            // TEST
            creator: '5cc5f7604907de1b08221aa0'
          });

          // Pass event to user.createdEvents
          const user = await User.findById('5cc5f7604907de1b08221aa0');
          if (!user) {
            throw new Error("User not found");
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
    createUser: {
      type: UserType,
      args: {
        user: { type: UserInputType }
      },
      async resolve(parent, args) {
        const { email, password } = args.user;

        try {
          const existedUser = await User.findOne({ email });

          if (existedUser) {
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
    }
  }
});

module.exports = RootMutation;
