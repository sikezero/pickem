const mongoose  = require('mongoose'),
      Schema    = mongoose.Schema,
      passportLocalMongoose = require("passport-local-mongoose");
      
const UserSchema = new Schema({
  username: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Username must be longer than 2 characters.'
        },
        required: [true, 'Username is required.']
    },
  email: {
        type: String,
        validate: {
            //TO-DO FIGURE OUT EMAIL VALIDATION
            validator: (email) => email.length > 2,
            message: 'Email must be longer than 2 characters.'
        },
        required: [true, 'Email is required.']
    },
  password: {
        type: String,
        validate: {
            validator: (password) => password.length > 2,
            message: 'Password must be longer than 2 characters.'
        }
        //required: [true, 'Password is required.']
    },
  firstName: String,
  lastName: String
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('user', UserSchema);
module.exports = User;
