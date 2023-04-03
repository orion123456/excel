import {capitalize} from "@core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root in DomListener`)
        }

        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Метод ${method} не подключен в ${this.name || ''}`)
            }
            this.$root.on(listener, this[method].bind(this))
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener)
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}