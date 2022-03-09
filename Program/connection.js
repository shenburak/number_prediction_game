const program_name = process.argv[2];
const connected_name = process.argv[3];

class Connection {
  #conn;
  #on_open;
  constructor(conn, on_open) {
    this.#conn = conn;
    this.#on_open = on_open;
  }
  static number_store_program = "number_store_" + program_name;
  static number_store_connected = "number_store_" + connected_name;
  static point_store_program = "point_store_" + program_name;
  static program_name = program_name;
  static connected_name = connected_name;
  createChannel() {
    this.#conn.createChannel(this.#on_open);
  }
}

module.exports = Connection;
