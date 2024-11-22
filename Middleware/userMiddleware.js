const registerVerify = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (
      firstName == undefined ||
      lastName == undefined ||
      email == undefined ||
      password == undefined
    ) {
      res.status(400).json({
        Message: "Please fill all the fields",
      });
    } else if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == ""
    ) {
      res.status(400).json({
        Message: "Fields cannt be null",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({
      message: "Error During Registration",
      error: error.message,
      errortxt: error,
    });
  }
};

module.exports = { registerVerify };
