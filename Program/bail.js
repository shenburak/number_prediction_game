function bail(err) {
  console.error(err);
  process.exit(1);
}
module.exports = bail;
