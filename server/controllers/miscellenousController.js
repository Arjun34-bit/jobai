const axios = require("axios");

const getLocation = async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: query,
          format: "json",
          limit: 5,
        },
        headers: {
          "User-Agent": "jobai-app/1.0",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching location", error });
  }
};

module.exports = { getLocation };
