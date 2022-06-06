const CronJob = require("cron").CronJob;
const User = require("../models/user");

const checkingRegistrationStatus = new CronJob({
  cronTime: "0 0 * * *", // every 24 hours
  onTick: function () {
    await User.update(
      {
        availableTill: {
          $lt: new Date(),
        },
      },
      { approval: "notRegistered" }
    );
  },
  start: true,
  timezone: "Asia/Kolkata",
});

checkingRegistraionStatus.start();
