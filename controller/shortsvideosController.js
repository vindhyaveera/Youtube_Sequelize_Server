const model = require("../models");
const shortsvideosTable = model.ShortsVideos;

const createshortsvideos = async function (req, res) {
  try {
    const data = req.body;
    const response = await shortsvideosTable.create(data);
    res.status(200).json({
      message: "shortsvideos Created Successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error In Creating shortsvidoes",
      error: error.message,
      errortxt: error,
    });
  }
};



const viewAll = async function (req, res) {
  try {
    const response = await shortsvideosTable.findAll();
    if (response == null) {
      res.status(200).json({
        message: "No data found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "shortsvideos listed succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In listing shortsvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

const viewOne = async function (req, res) {
  try {
    const { id } = req.params;
    const response = await shortsvideosTable.findOne({ where: { id: id } });
    if (response == null) {
      res.status(200).json({
        message: "shortsvideos not found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "shortsvideos listed succesfully",
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
    const response = await shortsvideosTable.update(data, {
      where: { id: id },
    });
    if (response == null) {
      res.status(200).json({
        message: "No data found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "shortvideos updated succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Updating shortsvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

const deleteshortsvideos = async function (req, res) {
  try {
    // const { id } = req.params;
    const id = req.body.id;

    const response = await shortsvideosTable.destroy({ where: { id: id } });
    if (response == null) {
      res.status(200).json({
        message: "No data found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "shortsvideos deleted succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Delete shortsvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

module.exports = {
  createshortsvideos,
  viewAll,
  viewOne,
  update,
  deleteshortsvideos,
};
