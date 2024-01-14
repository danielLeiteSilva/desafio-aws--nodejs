module.exports = function (request, response) {
  response.status(200).json({
    keepAlive: true
  })
}