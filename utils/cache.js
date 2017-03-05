module.exports = cache

function cache (stateStore) {
  var memory = {}

  stateStore.db.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).on('change', function (change) {
    if (change.deleted) {
      delete memory[change.id]
      return
    }
    memory[change.id] = change.doc
  })

  return {
    get: function (key) {
      if (memory[key]) {
        return Promise.resolve(memory[key])
      }

      return stateStore.find(key)

      .then(function (doc) {
        memory[key] = doc
        return doc
      })
    },

    set: function (doc) {
      memory[doc._id] = doc
      return Promise.resolve(memory[doc._id])
    },

    unset: function (key) {
      delete memory[key]
      return Promise.resolve()
    }
  }
}
