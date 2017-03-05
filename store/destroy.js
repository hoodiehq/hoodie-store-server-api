module.exports = destroyStore

var getDocOrFalse = require('../utils/get-doc-or-false')

function destroyStore (state, name) {
  return getDocOrFalse(state.stateStore, name)

  .then(function (doc) {
    if (doc === false) {
      throw new Error(`Database "${name}" does not exist`)
    }

    doc._deleted = true
    return state.stateStore.update(doc)
  })

  .then(function () {
    return new state.PouchDB(name).destroy()
  })

  .then(function () {
    state.emitter.emit('destroy', name)

    return name
  })
}
