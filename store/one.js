module.exports = one

function one (state, eventName, handler) {
  state.emitter.once(eventName, handler)
  return this
}
