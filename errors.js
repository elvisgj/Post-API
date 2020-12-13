const mongoose = require("mongoose");

function errorWrapper(fn) {
  return async function (req, res) {
    try {
      await fn(req, res);
    } catch (err) {
      if (err instanceof mongoose.CastError) {
        res.status(400).json({ msg: `Not a valid Id` });
        return;
      }

      res.status(500).json({ msg: "Server error" });
    }
  };
}

module.exports = { errorWrapper };
