require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 1000, name: "Learn Today" }],
  [2, { priceInCents: 20000, name: "Learn HTML/CSS today" }],
]);

app.listen(3000);
