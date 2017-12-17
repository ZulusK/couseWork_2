export default {
  ROOT_URL: process.env.NODE_ENV.startsWith('dev')
    ? `http://localhost:${process.env.PORT || 3000}`
    : `https://codual.herokuapp.com`,
  PLACEHOLDER: '/static/img/placeholder.png',
  PAGINATION_LIMIT: 10
}
