//@ts-check
const express = require("express");
//const { title } = require("process");
//const { runInNewContext } = require("vm");
const app = express();

const router =  require('./api/routes');

//middleware
const logging = require('./api/middleware/logging');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logging); //ükskõik kuhu, kasuta logging
app.use(router);

module.exports = app;