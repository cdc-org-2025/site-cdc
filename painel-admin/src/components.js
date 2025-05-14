import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();
const Components = {
  ConteudoEditor: componentLoader.add('ConteudoEditor', './components/conteudoEditor.jsx'),
  ImageListPreview: componentLoader.add('ImageListPreview', './components/imageListPreview.jsx'),
  UploadMultiple: componentLoader.add('UploadMultiple', './components/UploadMultiple.jsx'),
  UploadSingle: componentLoader.add('uploadSingle', './components/uploadSingle.jsx'),
  OportunidadeEditor: componentLoader.add('OportunidadeEditor', './components/oportunidadesEditor.jsx'),
  OportunidadePreView: componentLoader.add('OportunidadePreView', './components/oportunidadesPreView.jsx'),
  TituloEditor: componentLoader.add("TituloEditor", "./components/tituloEditor.jsx")
};

export { componentLoader, Components };