//Imports
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const privatePaths = require("mongoose-private-paths");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  pasword: {
    type: String,
    required: true,
    private: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee", "user"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "unverified", "disabled"],
    default: "active",
  },
});

UserSchema.pre('create', function (next) {
  console.log('Antes de guardar');
  next();
});

UserSchema.post('create', function () {
  console.log('Despues de guardar');
});

UserSchema.statics.create = function create(data) {
  return new this(data).save();
};

UserSchema.statics.show = async function show() {
  return await this.find();
};

UserSchema.statics.getUser = async function getUser(id) {
  const data = await this.findById(id);
  if (data === null) {
    throw new Error("Something bad happened.");
  }
  return data;
};

UserSchema.statics.updateUserById = async function updateUserById(id, data) {
  return await this.findByIdAndUpdate(id, data, {
    runValidators: true,
    context: "query",
    new: true,
  });
};

UserSchema.statics.deleteUserById = async function deleteUserById(id) {
  return await this.findByIdAndUpdate(
    id, {
      status: "disabled"
    }, {
      new: true
    }
  );
};

UserSchema.statics.loginUser = async function loginUser(data) {
  const {
    phone,
    password
  } = data;
  const user = await this.findOne({
    phone: phone
  });
  if (!user) {
    throw new Error('User or password fail')
  }

  if (user.password !== password) {
    throw new Error('Password fail')
  }

  return user;
}

UserSchema.plugin(privatePaths);
UserSchema.plugin(uniqueValidator, {
  message: "{PATH} Should be unique",
});

module.exports = mongoose.model("User", UserSchema);