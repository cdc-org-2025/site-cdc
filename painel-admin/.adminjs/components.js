// /.adminjs/components.js
import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
  ConteudoEditor: componentLoader.add('ConteudoEditor', './components/ConteudoEditor.jsx')
}

export { componentLoader, Components }
