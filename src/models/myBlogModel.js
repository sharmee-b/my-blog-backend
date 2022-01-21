"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

export const ArticleSchema = new Schema({
  name: {
    type: String,
    required: "Kindly enter the name of the article",
  },
  name: {
    type: String,
    required: "Kindly enter the content",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
