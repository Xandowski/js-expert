(() =>{
  const RESTART_BUTTON = 'btnRestart'
  const ID_COUNT = 'count'
  const COUNT_VALUE = 100
  const TIME_INTERVAL = 10

  class CountComponent {
    constructor() {
      this.start()
    }
    prepareCountProxy() {
      const handler = {
        set: (currentContext, propertyKey, newValue) => {
          console.log({ currentContext, propertyKey, newValue })

          if(!currentContext.value) {
            currentContext.stop()
          }
          currentContext[propertyKey] = newValue
          return true
        }
      }

      const count = new Proxy({
        value: COUNT_VALUE,
        stop: () => {}
      }, handler)

      return count
    }

    updateText = ({countElement, count}) => () => {
      const textIdentifier = '$$count'
      const defaultText = `Start in <strong>${textIdentifier}</strong> seconds...`
      countElement.innerHTML = defaultText.replace(textIdentifier, count.value--)
    }

    stopCount({ countElement, idInterval}) {
      return() => {
        clearInterval(idInterval)

        countElement.innerHTML = ""
        this.disableButton(false)
      }
    }

    prepareButton(buttonElement, startFn) {
      buttonElement.addEventListener('click', startFn.bind(this))

      return (value = true) => {
        const attribute = 'disabled'

        if(value) {
          buttonElement.setAttribute(attribute, value)
          return;
        }

        buttonElement.removeAttribute(attribute)
      }
    }

    start() {

      const countElement = document.getElementById(ID_COUNT)

      const count = this.prepareCountProxy()

      const args = {
        countElement,
        count
      }

      const fn = this.updateText(args)
      const idInterval = setInterval(fn, TIME_INTERVAL)
      
      {
        const buttonElement = document.getElementById(RESTART_BUTTON)
        const disableButton = this.prepareButton(buttonElement, this.start)

        const args = { countElement, idInterval}
        // const disableButton = () => console.log('disabled...');
        const stopCountFn = this.stopCount.apply({disableButton}, [args])
        count.stop = stopCountFn
      }
      
    }
  }
  window.CountComponent = CountComponent
})()