module.exports = grantAccess

var _ = require('lodash')

var addRolePrivilege = require('../utils/add-role-privilege')
var getRoleOption = require('../utils/get-role-option')
var toDbId = require('../utils/to-db-id')

function grantAccess (state, name, options) {
  return state.stateStore.update(toDbId(name), function (doc) {
    _.concat(options.access).forEach(function (privilege) {
      addRolePrivilege(doc.access, getRoleOption(options), privilege)
    })
  })

  .then(function (doc) {
    return state.cache.set(doc)
  })
}
