require("dotenv").config();

const bail = require("./bail");

const Consumer = require("./consumer");
const Publisher = require("./publisher");

const amqp_link = process.env.AMQP_RECEIVE_URL ?? "localhost";

require("amqplib/callback_api").connect(
  "amqp://" + amqp_link,
  function (err, conn) {
    if (err != null) bail(err);
    const consumer = new Consumer(conn, Consumer.default_on_open);
    consumer.createChannel();
    const publisher = new Publisher(conn, Publisher.default_on_open);
    publisher.createChannel();
  }
);

const consumer = new Consumer();
