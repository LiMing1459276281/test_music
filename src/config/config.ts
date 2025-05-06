export const port = process.env.PORT || 6666;
export const host = process.env.CF_URL
  ? `${process.env.CF_URL}`
  : `http://localhost:${port}`;
