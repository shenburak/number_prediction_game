const bail = require("./bail");

const Connection = require("./connection");

class Publisher extends Connection {
  constructor(conn, on_open) {
    super(conn, on_open);
  }
  static publish = (ch) => {
    const rand = Math.floor(Math.random() * 10);
    ch.assertQueue(Connection.number_store_program);
    ch.sendToQueue(Connection.number_store_program, Buffer.from(String(rand)));
    if (process.env.VERBOSE)
      console.log(
        "___GENERATE_NUMBER___ Number " +
          rand +
          " that is generated random to queue " +
          Connection.number_store_program +
          " was sent by program " +
          Connection.program_name
      );
  };
  static default_on_open = (err, ch) => {
    if (err != null) bail(err);
    Publisher.publish(ch);
  };
}

module.exports = Publisher;
