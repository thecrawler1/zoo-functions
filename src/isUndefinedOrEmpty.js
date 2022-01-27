function isUndefinedOrEmpty(x) {
  return x === undefined || Object.keys(x).length === 0;
}

module.exports = isUndefinedOrEmpty;
