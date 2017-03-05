module.exports = storeExists

var getDocOrFalse = require('../utils/get-doc-or-false')

function storeExists (state, name) {
  return getDocOrFalse(state, name)

  .then(function (result) {
    return !!result
  })
}
