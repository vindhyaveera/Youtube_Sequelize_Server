const model = require("../models");
const watchlater = model.WatchLater;
const bigvideosTable = model.BigVideos;
const shortsTable = model.ShortsVideos;
const user = model.User;

const createwatchlater = async function (req, res) {
  try {
    const data = req.body;
    const response = await watchlater.create(data);
    res.status(200).json({
      message: "vidoes stored Successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error In storing Bigvideos",
      error: error.message,
      errortxt: error,
    });
  }
};

// const getuserwatchlaterVideos = async (req, res) => {
//   try {
//     const { ids } = req.body; // Receive an array of video IDs
//     const videos = await bigvideosTable.findAll({
//       where: { id: ids },
//     });
//     res.status(200).json({ data: videos });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch videos", error });
//   }
// };

const getuserwatchlaterVideos = async (req, res) => {
  try {
    const { ids } = req.body;

    // Validate the input
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or missing 'ids' array" });
    }

    // Fetch videos from the database
    const videos = await bigvideosTable.findAll({
      where: { id: ids },
    });

    // Check if videos were found
    if (!videos.length) {
      return res
        .status(404)
        .json({ message: "No videos found for the provided IDs" });
    }

    // Send the videos as the response
    res.status(200).json({ data: videos });
  } catch (error) {
    console.error("Error fetching videos:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch videos", error: error.message });
  }
};

const getuserwatchlaterShortsVideos = async (req, res) => {
  try {
    const { ids } = req.body; // Receive an array of video IDs
    const videos = await shortsTable.findAll({
      where: { id: ids },
    });
    res.status(200).json({ data: videos });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos", error });
  }
};

const viewAll = async function (req, res) {
  try {
    // Extract userId from query parameters
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    // Fetch data for the specific user
    const response = await watchlater.findAll({
      where: { userId }, // Filter by userId
    });
    if (response == null) {
      res.status(200).json({
        message: "No data found for this user",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "watchlater listed succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In listing videos",
      error: error.message,
      errortxt: error,
    });
  }
};

const viewAllAssociate = async function (req, res) {
  try {
    // Extract userId from query parameters
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    // Fetch data for the specific user with associations
    const response = await watchlater.findAll({
      where: { userId }, // Filter by userId
      include: [
        // { model: user }, // Include User model
        { model: bigvideosTable }, // Include BigVideos model
        { model: shortsTable }, // Include ShortsVideos model
      ],
    });

    // Check if response is empty
    if (!response.length) {
      return res.status(200).json({
        message: "No data found for this user",
        data: response,
      });
    }

    res.status(200).json({
      message: "watchlater listed successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error in listing videos",
      error: error.message,
    });
  }
};

const deleteUser = async function (req, res) {
  try {
    const { userid, videosid, type } = req.params; // Extract `type` to determine video type
    // const id = req.body.id;

    // Determine column to match based on `type`
    const videoColumn = type === "big" ? "bigVideosId" : "shortVideosId";
    const response = await watchlater.destroy({
      where: {
        userId: userid,
        [videoColumn]: videosid, // Use computed property to dynamically choose column
      },
    });
    if (response == null) {
      res.status(200).json({
        message: "videos not found",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "watchlater videos deleted succesfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error In Delete Watchlatervideo",
      error: error.message,
      errortxt: error,
    });
  }
};

module.exports = {
  createwatchlater,
  viewAll,
  getuserwatchlaterVideos,
  getuserwatchlaterShortsVideos,
  viewAllAssociate,
  deleteUser,
};
