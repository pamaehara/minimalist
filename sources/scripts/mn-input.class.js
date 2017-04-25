const {HTMLElement} = window

class MnInput extends HTMLElement {
  constructor(self) {
    self = super(self)
    this.classList.add('mn-input')
    return self
  }
}

window.MnInput = MnInput
window.customElements.define('mn-input', MnInput)

module.exports = MnInput
