module.exports = destroyStore

var getDocOrFalse = require('../utils/get-doc-or-false')

function destroyStore (state, name) {
  return getDocOrFalse(state, name)

  .then(function (doc) {
    if (doc === false) {
      throw new Error(`Database "${name}" does not exist`)
    }

    doc._deleted = true
    return state.stateStore.update(doc)
  })

  .then(function (doc) {
    state.cache.unset(doc._id)
    return new state.PouchDB(name).destroy()
  })

  .then(function () {
    state.emitter.emit('destroy', name)

    return name
  })
}
