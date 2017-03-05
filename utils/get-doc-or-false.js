module.exports = getDocOrFalse

var toDbId = require('./to-db-id')

function getDocOrFalse (state, name) {
  return state.cache.get(toDbId(name))

  .catch(function (error) {
    if (error.status === 404) {
      return false
    }

    throw error
  })
}
