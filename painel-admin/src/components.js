import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();
const Components = {
  ConteudoEditor: componentLoader.add('ConteudoEditor', './components/conteudoEditor.jsx')
};

export {componentLoader, Components};