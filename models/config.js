const { model, Schema } = require("mongoose");

module.exports = model(
    "config",
    new Schema({
        User: String,
        APIKey: String
    })
);