export const ROOT_URL = process.env.NODE_ENV == 'dev'
  ? `http://localhost:${process.env.PORT || 3000}`
  : `https://codual.herokuapp.com`;
