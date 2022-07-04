const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/getallapis", (req, res) => {
  const randaqiapivar = Math.floor(Math.random() * 6) + 1;
  let newaqiapi = "",
    myapi = "",
    cityapi = "",
    freetimezoneapi = "";
  switch (randaqiapivar) {
    case 1:
      myapi = process.env.myapi1;
      cityapi = process.env.cityapi1;
      freetimezoneapi = process.env.freetimezoneapi1;
      newaqiapi = process.env.newaqiapi1;
      break;
    case 2:
      myapi = process.env.myapi2;
      cityapi = process.env.cityapi2;
      freetimezoneapi = process.env.freetimezoneapi2;
      newaqiapi = process.env.newaqiapi2;
      break;
    case 3:
      myapi = process.env.myapi3;
      cityapi = process.env.cityapi3;
      freetimezoneapi = process.env.freetimezoneapi3;
      newaqiapi = process.env.newaqiapi3;
      break;
    case 4:
      myapi = process.env.myapi4;
      cityapi = process.env.cityapi4;
      freetimezoneapi = process.env.freetimezoneapi4;
      newaqiapi = process.env.newaqiapi4;
      break;
    case 5:
      myapi = process.env.myapi5;
      cityapi = process.env.cityapi5;
      freetimezoneapi = process.env.freetimezoneapi5;
      newaqiapi = process.env.newaqiapi5;
      break;
    case 6:
      myapi = process.env.myapi6;
      cityapi = process.env.cityapi6;
      freetimezoneapi = process.env.freetimezoneapi6;
      newaqiapi = process.env.newaqiapi6;
      break;
  }

  res.status(200).send({ myapi, cityapi, freetimezoneapi, newaqiapi });
});

app.post("/converthms", (req, res) => {
  const { value, type, mytimezone } = req.body;
  let unix_timestamp = value;
  var date = new Date(unix_timestamp * 1000);
  let newdate = date.toLocaleString("en-US", { timeZone: mytimezone });
  date = new Date(newdate);
  var hours = date.getHours();
  var minute = date.getMinutes();
  var suffix = hours >= 12 ? "pm" : "am";
  var hour = ((hours + 11) % 12) + 1 + " " + suffix;
  hours = hours % 12 || 12;
  let hourandmin = "",
    onlyhour = hour;
  if (minute < 10) {
    hourandmin = hours + ":0" + minute + " " + suffix;
  } else {
    hourandmin = hours + ":" + minute + " " + suffix;
  }

  if (type === "curr") {
    res.status(200).send({
      myhms:
        date.toLocaleDateString("locale", { weekday: "short" }) +
        ", " +
        date.getDate() +
        " " +
        date.toLocaleString("default", { month: "long" }) +
        "  " +
        hourandmin,
    });
  } else if (type === "hour") {
    res.status(200).send({
      myhms: onlyhour,
    });
  } else if (type === "minutes") {
    res.status(200).send({
      myhms: hourandmin,
    });
  } else if (type === "tom") {
    res.status(200).send({
      myhms:
        date.toLocaleDateString("locale", { weekday: "short" }) +
        ", " +
        date.getDate() +
        " " +
        date.toLocaleString("default", { month: "long" }),
    });
  }
});

app.post("/notifi", async (req, res) => {
  const { expoPushToken, title, body } = req.body;
  try {
    const message = {
      to: expoPushToken,
      sound: "default",
      title,
      body,
      data: { someData: "goes here" },
    };

    const resp = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      message,
      {
        headers: {
          Accept: "*/*",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("Done -> ", resp.data);
    res.status(200).send({ data: resp.data });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
