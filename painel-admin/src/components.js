import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();
const Components = {
  ConteudoEditor: componentLoader.add('ConteudoEditor', './components/conteudoEditor.jsx'),
  ImageListPreview: componentLoader.add('ImageListPreview', './components/imageListPreview.jsx'),
  UploadMultiple: componentLoader.add('UploadMultiple', './components/UploadMultiple.jsx') // 👈 novo

};

export {componentLoader, Components};