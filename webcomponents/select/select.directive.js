const angular = require('angular')

angular
  .module('minimalist')
  .directive('mnSelect', MnSelectDirective)

function MnSelectDirective() {
  return {
    restrict: 'C',
    link(scope, element) {
      element.ready(() => {
        const component = element[0]
        component._setOptions()
        component._setActionSheet()
      })
    }
  }
}

angular
  .module('minimalist')
  .directive('option', MnSelectOptionDirective)

function MnSelectOptionDirective() {
  return {
    restrict: 'C',
    link(scope, element) {
      const option = element[0]
      const isMnOption = option.closest('.mn-select')

      element.ready(() => {
        const actionSheet = isMnOption.actionSheet

        if (isMnOption && actionSheet) {
          option.innerHTML = option.textContent
            .split('')
            .map(char => `<span class="char" data-char="${char.toLowerCase()}">${char}</span>`)
            .join('')

          let actionSheetOption = Array
            .from(actionSheet.menu.querySelectorAll('.option'))
            .filter(children => children.textContent === option.textContent)[0]

          if (actionSheet && !actionSheetOption) {
            actionSheetOption = document.createElement('div')
            actionSheetOption.classList.add('option')
            actionSheetOption.textContent = option.textContent
            actionSheet.menu.appendChild(actionSheetOption)
          }

          element.bind('$destroy', () => {
            actionSheet.menu.removeChild(actionSheetOption)
          })
        }
      })
    }
  }
}