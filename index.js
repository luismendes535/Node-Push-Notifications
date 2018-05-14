const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BLtgZgPVTQHMzw7UsqlnfdQ0zcUbHvLRJWotFSjPGFe7W8OYLbzNEw7m8OouHWshn5Dh86uLNKDhftpaUK5zaHA";
const privateVapidKey = "PnMPko7wPRetg4d_LGlv36ZQfeQMG1l28nTIvGcz-cg"; //In case of deployment store in env

webpush.setVapidDetails(
  "mailto:luismendes535@gmail.com",
  publicVapidKey,
  privateVapidKey
);

//Subscribe route
app.post("/subscribe", (req, res) => {
  //Get push subscription object
  const subscription = req.body;

  //Send 201 status - resource created "The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource. " MDN web docs
  res.status(201).send({});

  //Create payload
  const payload = JSON.stringify({ title: "Push test" });

  //Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
