class TokenExpiredError extends Error {
  constructor(messege: string) {
    super(messege);
  }
}
export default { TokenExpiredError };
