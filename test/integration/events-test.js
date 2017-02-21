var PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-adapter-memory'))
var test = require('tap').test

var StoreAPIFactory = require('../..')

test('Store events', function (group) {
  group.test('.on', function (t) {
    t.plan(2)

    var Store = StoreAPIFactory(PouchDB)

    Store.on('create', function (name) {
      t.is(name, 'db', '"create" triggered')
    })
    Store.on('destroy', function (name) {
      t.is(name, 'db', '"destroy" triggered')
    })

    Store.create('db')

    .then(function () {
      Store.destroy('db')
    })
  })

  group.test('.one', function (t) {
    t.plan(1)

    var Store = StoreAPIFactory(PouchDB)

    Store.one('create', function (name) {
      t.is(name, 'db2', '"create" triggered')
    })

    Store.create('db2')

    .then(function () {
      Store.create('db22')
    })
  })

  group.test('.off', function (t) {
    var Store = StoreAPIFactory(PouchDB)

    function handleCreate (name) {
      t.fail('handler should not be called')
    }

    Store.on('create', handleCreate)
    Store.off('create', handleCreate)

    Store.create('db3')

    .then(function () {
      t.end()
    })
  })

  group.end()
})
