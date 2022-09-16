import {capitalize} from './utils';

export class DOMListener {
  constructor($root, listeners=[]) {
    if (!$root) {
      throw new Error(`No $root provided for DOMListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    // console.log(this.listeners)
    this.listeners.forEach((event) => {
      const methodName = getMethodName(event)
      if (!this[methodName]) {
        throw new Error(
            `Method ${methodName} 
            on class ${this.name} is not implemented!`
        )
      }
      this[methodName] = this[methodName].bind(this)
      this.$root.on(event, this[methodName])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((event) => {
      const methodName = getMethodName(event)
      this.$root.off(event, this[methodName])
    })
  }
}

function getMethodName(event) {
  return 'on' + capitalize(event)
}
