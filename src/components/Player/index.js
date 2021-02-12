const components = {}
var requireComponent = require.context(".", true, /Player[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(function (fileName) {
  var baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  var baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
    )
    components[baseComponentName] = baseComponentConfig
})

export default components
