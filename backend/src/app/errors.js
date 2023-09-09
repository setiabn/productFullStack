class ResponseError extends Error {
  /**
   *
   * @param {number} statusCode
   * @param {string} message
   */
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }
}

module.exports = { ResponseError };
