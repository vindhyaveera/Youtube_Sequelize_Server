const model = require("../models");
const userTable = model.User;
const bigvideos=model.BigVideos;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "456372891";

const createUser = async function (req, res) {
  try {
    const data = req.body;
    const isexists = await userTable.findOne({ where: { email: data.email } });
    if (isexists) {
      res.status(200).json({
        message: "User already exists",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashvalue = bcrypt.hashSync(data.password, salt);
      data.password = hashvalue;
      const response = await userTable.create(data).then(async (data) => {
        const token = jwt.sign({ id: data.id }, secret, { expiresIn: "24hrs" });
        const update = await userTable.update(
          { token: token },
          {
            where: { id: data.id },
          }
        );
        res.status(200).json({
          message: "User Created Successfully",
          data,
          token: {
            id: data.id,
            token: token,
          },
        });
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Creating USer",
      error: error.message,
      errortxt: error,
    });
  }
};


const viewAll = async function (req, res) {
  try {
    const response = await userTable.findAll();
    if (response == null) {
      res.status(200).json({
        message: "No Data found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "User listed succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In listing USer",
      error: error.message,
      errortxt: error,
    });
  }
};


const viewOne = async function (req, res) {
  try {
    const { id } = req.params;
    const response = await userTable.findOne({ where: { id: id } });
    if (response == null) {
      res.status(200).json({
        message: "User not found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "User listed succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Listing User",
      error: error.message,
      errortxt: error,
    });
  }
};



const update = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await userTable.update(data, { where: { id: id } });

    if (response == null) {
      res.status(200).json({
        message: "User not found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "User updated succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Updating User",
      error: error.message,
      errortxt: error,
    });
  }
};


const deleteUser = async function (req, res) {
  try {
    // const { id } = req.params;
    const id = req.body.id;

    const response = await userTable.destroy({ where: { id: id } });
    if (response == null) {
      res.status(200).json({
        message: "User not found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "User deleted succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Delete User",
      error: error.message,
      errortxt: error,
    });
  }
};


const loginUser = async function (req, res) {
  try {
    const form = req.body;
    const isexists = await userTable.findOne({ where: { email: form.email } });
    if (!isexists) {
      res.status(400).json({
        message: "User not found",
      });
    } else {
      const password = form.password;
      const hashvalue = isexists.password;
      const isvalid = bcrypt.compareSync(password, hashvalue);
      if (!isvalid) {
        res.status(400).json({
          message: "Invalid password!!!",
        });
      } else {
        const token = jwt.sign({ id: isexists.id }, secret, {
          expiresIn: "24hrs",
        });
        const update = await userTable.update(
          { token: token },
          { where: { id: isexists.id } }
        );
        if (!update) {
          res.status(400).json({
            message: "failed to update token",
            error: error.message,
            errortxt: error,
          });
        } else {
          res.status(200).json({
            message: "login successfully",
            token: {
              id: isexists.id,
              token,
            },
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
      errortxt: error,
    });
  }
};



const getuserVideos = async function (req, res) {
  try {
    // const { id } = req.params; // Extract the id from the route parameters
    const id = parseInt(req.params.id, 10); // Convert the id to an integer


    // const userWithVideos = await userTable.findOne({
    //   where: { id: id },
    //   include: [Bigvideosuser] // Directly referencing an alias or association
    // });

    const userWithVideos = await userTable.findOne({
      where: { id: id },
      include:  [
        {
          model: model.BigVideos, // Include associated BigVideos
          as: "Bigvideosuser", // Use the correct alias from your associations
        }
      ], // Include associated videos
    });

    res.status(200).json({
      Message: "Bigvideos listed successfully",
      data: userWithVideos,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error listing cart",
      error: error.message,
      errortxt: error,
    });
  }
};



// const userWithVideos = await User.findOne({
//   where: { id: id }, // Match the User by id
//   include: [
//     {
//       model: BigVideos, // Include associated BigVideos
//       as: "bigvideos", // Use the correct alias from your associations
//     },
//   ],


const getuserShortsVideos = async function (req, res) {
  try {
    const { id } = req.params; // Extract the id from the route parameters


    // const userWithVideos = await userTable.findOne({
    //   where: { id: id },
    //   include: [Bigvideosuser] // Directly referencing an alias or association
    // });

    const userWithVideos = await userTable.findOne({
      where: { id: id },
      include:  [
        {
          model: model.ShortsVideos, // Include associated BigVideos
          as: "Shortvideosuser", // Use the correct alias from your associations
        },
      ], // Include associated videos
    });

    res.status(200).json({
      Message: "Shortsvideos listed successfully",
      data: userWithVideos,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error listing cart",
      error: error.message,
      errortxt: error,
    });
  }
};


module.exports = {
  createUser,
  viewAll,
  viewOne,
  update,
  deleteUser,
  loginUser,
  getuserVideos,
  getuserShortsVideos,
};
