const User = require("../models/user");

const createAdminAccount = async () => {
  try {
    const existingUser = await User.find({
      mobile: process.env.ADMIN_MOBILE,
      email: process.env.ADMIN_EMAIL,
    });

    console.log({ existingUser });

    if (existingUser.length > 0) return;

    const userData = {
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      mobile: process.env.ADMIN_MOBILE,
      password: process.env.ADMIN_PASSWORD,
      DOB: "1 Jan 2000",
      isAdmin: true,
    };
    const user = new User(userData);
    await user.save();
    console.log({ user });
  } catch (e) {
    console.log(e);
  }
};

createAdminAccount();
