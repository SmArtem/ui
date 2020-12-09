import { Component } from 'vue'
import { addClass, removeClass } from '../common'

class PopupManager {
    zIndex = 2000;
    instances = Map()
    modalStack = []
    hasModal = false
    modalDom = null
    isServer = false;

    constructor (isServer: boolean) {
      this.register = this.register.bind(this)
      this.deregister = this.deregister.bind(this)
      this.getModal = this.getModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.nextZIndex = this.nextZIndex.bind(this)
      this.isServer = isServer
      if (!isServer) {
      // handle `esc` key when the popup is shown
        window.addEventListener('keydown', function (event) {
          if (event.key === 'Escape') {
            const topPopup = this.getTopPopup()

            if (topPopup && topPopup.closeOnPressEscape) {
              topPopup.handleClose
                ? topPopup.handleClose()
                : topPopup.handleAction
                  ? topPopup.handleAction('cancel')
                  : topPopup.close()
            }
          }
        })
      }
    }

    getInstance (id: string) {
      return this.instances.get(id)
    }

    register (id: string, instance: Component) {
      if (id && instance) {
        this.instances.set(id, instance)
      }
    }

    deregister (id: string) {
      if (id) {
        this.instances.delete(id)
      }
    }

    nextZIndex () {
      return this.zIndex++
    }

    getModal () {
      if (this.isServer) return
      let modalDom = this.modalDom
      if (this.modalDom) {
        this.hasModal = true
      } else {
        this.hasModal = false
        modalDom = document.createElement('div')
        this.modalDom = modalDom

        modalDom.addEventListener('touchmove', function (event) {
          event.preventDefault()
          event.stopPropagation()
        })

        modalDom.addEventListener('click', () => {
          this.doOnModalClick && this.doOnModalClick()
        })
      }

      return modalDom
    }

    getTopPopup () {
      if (this.isServer) return

      const topPopup = this.modalStack.length > 0 ? this.modalStack[this.modalStack.length - 1] : null
      return topPopup ? this.getInstance(topPopup.id) : null
    }

    doOnModalClick () {
      const instance = this.getTopPopup()
      if (instance && instance.closeOnClickModal) {
        instance.close()
      }
    }

    openModal (id, zIndex, dom, modalClass, modalFade) {
      if (this.isServer) return
      if (!id || zIndex === undefined) return
      this.modalFade = modalFade

      const { modalStack } = this

      if (modalStack.findIndex(item => item === id) > -1) return

      const modalDom = this.getModal()

      addClass(modalDom, 've-modal-overlay')
      if (this.modalFade && !this.hasModal) {
        addClass(modalDom, 've-modal-overlay-enter')
      }
      if (modalClass) {
        const classArr = modalClass.trim().split(/\s+/)
        classArr.forEach(item => addClass(modalDom, item))
      }
      setTimeout(() => {
        removeClass(modalDom, 've-modal-overlay-enter')
      }, 200)

      if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
        dom.parentNode.appendChild(modalDom)
      } else {
        document.body.appendChild(modalDom)
      }

      if (zIndex) {
        modalDom.style.zIndex = zIndex
      }
      modalDom.tabIndex = 0
      modalDom.style.display = ''

      modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass })
    }

    closeModal (id) {
      const { modalStack } = this
      const modalDom = this.getModal()

      if (modalStack.length > 0) {
        const topItem = modalStack[modalStack.length - 1]
        if (topItem.id === id) {
          if (topItem.modalClass) {
            const classArr = topItem.modalClass.trim().split(/\s+/)
            classArr.forEach(item => removeClass(modalDom, item))
          }

          modalStack.pop()
          if (modalStack.length > 0) {
            modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex
          }
        } else {
          const modalIndex = modalStack.findIndex(item => item.id === id)
          modalStack.splice(modalIndex, 1)
        }
      }

      if (modalStack.length === 0) {
        if (this.modalFade) {
          addClass(modalDom, 've-modal-overlay-leave')
        }
        setTimeout(() => {
          if (modalStack.length === 0) {
            if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom)
            modalDom.style.display = 'none'
            this.modalDom = undefined
          }
          removeClass(modalDom, 've-modal-overlay-leave')
        }, 200)
      }
    }
}

export default new PopupManager(Vue.prototype.$isServer)
