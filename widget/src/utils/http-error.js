export default class HttpError extends Error {
  constructor(status, data = null) {
    super(status);
    this.data = data;
  }
}
