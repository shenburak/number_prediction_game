const bail = require("./bail");

const Connection = require("./connection");
const Publisher = require("./publisher");

class Consumer extends Connection {
  constructor(conn, on_open) {
    super(conn, on_open);
  }
  static addPoint = (ch, received_number, predictions) => {
    ch.assertQueue(Connection.point_store_program);
    ch.sendToQueue(Connection.point_store_program, Buffer.from(String(1)));
    if (process.env.VERBOSE)
      console.log(
        "~~~PREDICT_TRUE~~~ 1 point has been added to the " +
          Connection.point_store_program +
          " queue because program " +
          Connection.program_name +
          " knew the random number " +
          received_number +
          " coming to the " +
          Connection.number_store_connected +
          " queue and predicted it in the " +
          predictions +
          " number array."
      );
  };
  static consume = (ch) => {
    ch.assertQueue(Connection.number_store_connected);
    ch.consume(Connection.number_store_connected, function (msg) {
      if (msg !== null) {
        const received_number = Number(msg.content.toString());
        const predictions = Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * 10)
        );
        if (process.env.VERBOSE)
          console.log(
            "---GET_NUMBER--- Number " +
              received_number +
              " came from the " +
              Connection.number_store_connected +
              " queue and the " +
              predictions +
              " number array is created for predictions by program " +
              Connection.program_name
          );
        if (predictions.includes(received_number)) {
          Consumer.addPoint(ch, received_number, predictions);
        }
        ch.ack(msg);
        Publisher.publish(ch);
      }
    });
  };
  static default_on_open = (err, ch) => {
    if (err != null) bail(err);
    Consumer.consume(ch);
  };
}

module.exports = Consumer;
