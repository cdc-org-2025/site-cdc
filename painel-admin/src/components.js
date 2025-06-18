import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();
const Components = {
  ConteudoEditor: componentLoader.add('ConteudoEditor', './components/conteudoEditor.jsx'),
  ImageListPreview: componentLoader.add('ImageListPreview', './components/imageListPreview.jsx'),
  UploadMultiple: componentLoader.add('UploadMultiple', './components/UploadMultiple.jsx'),
  UploadSingle: componentLoader.add('uploadSingle', './components/uploadSingle.jsx'),
  OportunidadeEditor: componentLoader.add('OportunidadeEditor', './components/oportunidadesEditor.jsx'),
  OportunidadePreView: componentLoader.add('OportunidadePreView', './components/oportunidadesPreView.jsx'),
  MultiSelectInput: componentLoader.add("MultiSelectInput", "./components/multiSelectInput.jsx"),
  AreaListDisplay: componentLoader.add("AreaListDisplay", "./components/areaListDisplay.jsx"),
  NoticiaPreview: componentLoader.add("NoticiaPreview", "./components/noticiasPreview.jsx"),
  // ImageListEditPreview: componentLoader.add("ImageListEditPreview", "./components/imageListEditPreview.jsx"),
  EditorLinhaTempo: componentLoader.add("EditorLinhaTempo", "./components/editorlinhaTempo.jsx"),
  ProgramaEditor: componentLoader.add("ProgramaEditor", './components/editorProgramas.jsx'),
  TextoPreview: componentLoader.add("TextoPreview", "./components/textoShow.jsx"),
  ImageEditor: componentLoader.add("ImageEditor", "./components/imagemEdit.jsx"),
  CapaTituloEditor: componentLoader.add("CapaTituloEditor", "./components/editorTituloCapa.jsx"),

};

export { componentLoader, Components };