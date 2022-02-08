const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

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

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
