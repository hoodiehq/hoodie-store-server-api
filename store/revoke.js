module.exports = revokeAccess

var _ = require('lodash')

var getRoleOption = require('../utils/get-role-option')
var removeRolePrivilege = require('../utils/remove-role-privilege')
var toDbId = require('../utils/to-db-id')

function revokeAccess (state, name, options) {
  return state.stateStore.update(toDbId(name), function (doc) {
    _.concat(options.access).forEach(function (privilege) {
      removeRolePrivilege(doc.access, getRoleOption(options), privilege)
    })
  })

  .then(function (doc) {
    return state.cache.set(doc)
  })
}
