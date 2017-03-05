module.exports = getDocOrFalse

var toDbId = require('./to-db-id')

function getDocOrFalse (stateStore, name) {
  return stateStore.find(toDbId(name))

  .catch(function (error) {
    if (error.status === 404) {
      return false
    }

    throw error
  })
}
