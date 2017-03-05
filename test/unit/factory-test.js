var test = require('tap').test

var StoreAPIFactory = require('../..')

var PouchDBMock = function () {
  return {
    hoodieApi: function () {
      return {
        db: {
          __opts: {},
          changes: function () {
            return {
              on: function () {}
            }
          }
        },
        withIdPrefix: function () {
          return {
            findAll: function () {
              return Promise.resolve([])
            }
          }
        }
      }
    }
  }
}
PouchDBMock.plugin = function () {}

test('Store API Factory', function (group) {
  group.test('passing PouchDB as first argument', function (t) {
    var Store = StoreAPIFactory(PouchDBMock)

    t.is(typeof Store.create, 'function', 'returns Store Constructor')

    t.end()
  })

  group.test('without argument', function (t) {
    t.plan(2)

    try {
      StoreAPIFactory()
    } catch (error) {
      t.ok(error, 'throws error')
      t.is(error.message, 'Store API Factory requires PouchDB as first argument')
    }

    t.end()
  })

  group.end()
})
