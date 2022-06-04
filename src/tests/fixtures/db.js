const User = require("../../models/user");

const firstUser = {
  name: "user name",
  DOB: "Sep 16 2011",
  mobile: "9998887776",
  email: "user@email.com",
  password: "password",
  isStudent: true,
  isEmployee: false,
};

const secondUser = {
  name: "second User",
  DOB: "Dec 16 2001",
  mobile: "9000000009",
  email: "user@domain.com",
  password: "password",
  isStudent: true,
  isEmployee: false,
};

const setupDb = async () => {
  await User.deleteMany();
  await new User(firstUser).save();
  await new User(secondUser).save();
};

module.exports = {
  firstUser,
  secondUser,
  setupDb,
};
