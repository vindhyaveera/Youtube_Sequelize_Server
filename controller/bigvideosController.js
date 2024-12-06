const model = require("../models");
const bigvideosTable = model.BigVideos;
const user = model.User;
// const videosTable=model.Videos;

const createbigvideos = async function (req, res) {
  try {
    const data = req.body;
    const response = await bigvideosTable.create(data);
    res.status(200).json({
      message: "Bigvideos data Created Successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error In Creating Bigvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

const viewAll = async function (req, res) {
  try {
    const response = await bigvideosTable.findAll();
    if (response == null) {
      res.status(200).json({
        message: "No data found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "Bigvideos listed succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In listing bigvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

const viewOne = async function (req, res) {
  try {
    const { id } = req.params;
    const response = await bigvideosTable.findOne({ where: { id: id } });
    if (response == null) {
      res.status(200).json({
        message: "Data not found in bigvideos",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "Bigvideos listed succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Listing data of bigvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

const viewChannels = async function (req, res) {
  try {
    const { channel } = req.params;
    const response = await bigvideosTable.findAll({
      where: { channel: channel },
    });
    if (response == null) {
      res.status(200).json({
        message: "videos in this channels not found in bigvideos",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "channels Bigvideos listed succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Listing channels of bigvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

const update = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await bigvideosTable.update(data, { where: { id: id } });
    if (response == null) {
      res.status(200).json({
        message: "No data found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "Bigvideos Updated succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Updating Bigvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

const deletebigvideos = async function (req, res) {
  try {
    // const { id } = req.params;
    const id = req.body.id;

    const response = await bigvideosTable.destroy({ where: { id: id } });
    if (response == null) {
      res.status(200).json({
        message: "User not found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "Bigvideos deleted succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Deleting bigvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

const getuserVideos = async function (req, res) {
  try {
    const { id } = req.params; // Extract the id from the route parameters

    // const bigvideos = await bigvideosTable.findAll({
    //   where: { UserId: id },
    //   include: ["bigvideos"],
    // });

    // const userWithVideos = await user.findOne({
    //   where: { id: id },
    //   include: ["bigvideos"], // Include associated videos
    // });

    const userWithVideos = await userTable.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [
        {
          model: model.BigVideos, // Reference the model
          as: "Bigvideosuser", // Match the alias defined in the association
        },
      ],
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

module.exports = {
  createbigvideos,
  viewAll,
  viewOne,
  update,
  deletebigvideos,
  viewChannels,
  // viewBigVideos,
  getuserVideos,
};
