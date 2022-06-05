const isVolunteer = (req, res, next) => {
  if (req.user.isAdmin)
    return res
      .status(401)
      .send({ message: "Can only be accessed by volunteers" });

  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ message: "Can only be accessed by admins" });

  next();
};

module.exports = {
  isVolunteer,
  isAdmin,
};
