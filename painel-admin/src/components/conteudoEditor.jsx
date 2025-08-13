import React, { useState, useRef } from 'react';
import { Box, TextArea } from '@adminjs/design-system';
import SunEditor from 'suneditor-react';
import axios from 'axios';


// Se necessário, defina os formatos
const formats = [
  { tag: 'h2', name: 'Subtítulo' },
  { tag: 'p', name: 'Parágrafo' },
  { tag: 'blockquote', name: 'Citacao' },
];

// Converte estilos para inline
function convertStylesToInline(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  tempDiv.querySelectorAll('h1').forEach(el => {
    el.style.fontSize = '32px';
    el.style.color = '#A7181D';
    el.style.fontWeight = 'bold';
    el.style.lineHeight = '1.3';
  });

  tempDiv.querySelectorAll('h2').forEach(el => {
    el.style.fontSize = '24px';
    el.style.color = '#333333';
    el.style.fontWeight = '600';
    el.style.lineHeight = '1.4';
  });

  tempDiv.querySelectorAll('p').forEach(el => {
    el.style.fontSize = '22px';
    el.style.color = '#000000';
    el.style.lineHeight = '1.6';
    el.style.fontWeight= '400'
  });

  tempDiv.querySelectorAll('iframe').forEach(el => {
    el.style.width = '800px';
    el.style.height = '400px';
    el.style.display = 'block';
    el.style.margin = '20px auto';
    el.setAttribute('width', '800');
    el.setAttribute('height', '400');
  });

  tempDiv.querySelectorAll('blockquote').forEach(el => {
    el.style.borderLeft = '3px solid #A7181D';
    el.style.paddingLeft = '12px';
    el.style.margin = '16px 0';
    el.style.fontStyle = 'italic';
    el.style.fontSize = '18px';
    el.style.color = '#000000';
    el.style.lineHeight = '1.6';
    el.style.quotes = '"\\201C""\\201D""\\2018""\\2019"';
  });

  const uls = tempDiv.querySelectorAll('ul');
  uls.forEach((ul) => {
    ul.style.paddingLeft = '40px';
    ul.style.paddingRight = '20px';
    // ul.style.paddingTop = '10px';
    // ul.style.paddingBottom = '10px';
    ul.style.boxSizing = 'border-box';
    ul.style.fontSize = '18px'
    ul.style.marginTop = '16px'; // espaço acima da lista
    ul.style.marginBottom = '16px'; // espaço acima da lista
  });

  const ols = tempDiv.querySelectorAll('ol');
  ols.forEach((ol) => {
    ol.style.paddingLeft = '40px';
    ol.style.paddingRight = '20px';
    // ol.style.paddingTop = '10px';
    // ol.style.paddingBottom = '10px';
    ol.style.boxSizing = 'border-box';
    ol.style.fontSize = '18px'
    ol.style.marginTop = '16px'; // espaço acima da lista
    ol.style.marginBottom = '16px'; // espaço acima da lista
  });

  return tempDiv.innerHTML;
}



const ConteudoEditor = (props) => {
  const { onChange, property, record } = props;

  console.log('record.params Noticias', record.params)
  const initialData = record.params['html_original'] || {
    titulo: '',
    conteudo: '<p><br></p>',
  };

  const [titulo, setTitulo] = useState(record.params['titulo'] || '');
  const editorRef = useRef(null);

  const handleSetInstance = (instance) => {
    editorRef.current = instance;
  };

  const uploadImageToGCP = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'editor-images');

    try {
      const response = await axios.post('/admin/upload-editor-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.url;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      return null;
    }
  };
  const onImageUploadBefore = async (files) => {
    // 1. Primeiro obtemos o conteúdo atual do editor
    const currentContent = editorRef.current ? editorRef.current.getContents() : '';

    // 2. Fazemos o upload das imagens para o GCP
    const uploadPromises = Array.from(files).map(async (file) => {
      const imageUrl = await uploadImageToGCP(file);
      if (imageUrl) {
        return `<img src="${imageUrl}" style="display: inline-block; margin: 0 5px; max-width: 100%;" />`;
      }
      return '';
    });

    const htmlImages = await Promise.all(uploadPromises);
    const filteredImages = htmlImages.filter(img => img !== '');

    if (filteredImages.length > 0) {
      const inlineHtml = filteredImages.join("") + "&nbsp;";

      if (editorRef.current) {
        editorRef.current.insertHTML(inlineHtml); // insere na posição do cursor

        // Aguarda a imagem ser inserida, então limpa as base64 sem afetar a posição do cursor anterior
        setTimeout(() => {
          let updatedContent = editorRef.current.getContents();

          // Remove imagens base64
          updatedContent = updatedContent.replace(/<img[^>]src="data:image\/[^;]+;base64[^"]+"[^>]*>/g, '');

          // Remove divs de imagem vazias (div com class se-image-container com figure vazio)
          updatedContent = updatedContent.replace(
            /<div class="se-component se-image-container[^"]*"[^>]*>\s*<figure[^>]*>\s*<\/figure>\s*<\/div>/g,
            ''
          );
          updatedContent = updatedContent.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/g, '');


          editorRef.current.setContents(updatedContent);
        }, 0);

      }
    }
    return false; // Impede a inserção padrão do SunEditor com Base64
  };

  const handleTituloChange_temp = (e) => {
    const newTitulo = convertStylesToInline(e.target.value);
    setTitulo(newTitulo);
    onChange('titulo', newTitulo);
  };


  const handleEditorChange = (newHtml) => {
    const styledHtml = convertStylesToInline(newHtml);

    onChange('html_original', styledHtml); // Isso envia para o AdminJS ou backend
  };


  return (
    <Box>
      <TextArea
        placeholder="Digite o título da notícia"
        value={titulo}
        onChange={handleTituloChange_temp}
        rows={2}
        sm={12}
        borderless
        style={{
          width: '100%',
          cursor: 'text',
          fontSize: '32px',
          fontWeight: 'bold',
          color: "#A7181D",
          lineHeight: '1.3',
        }}
      />

      <Box mt="xl">
        <SunEditor
          getSunEditorInstance={handleSetInstance}
          placeholder="Digite algo aqui..."
          // height="600px"
          onImageUploadBefore={onImageUploadBefore}
          onChange={handleEditorChange}
          defaultValue={initialData}
          setOptions={{
            height: 800,
            buttonList: [
              ["undo", "redo"],
              ["formatBlock"],
              ["bold", "underline", "italic", "strike", "subscript", "superscript"],
              ["fontColor", "hiliteColor"],
              ["align", "list", "table"],
              ["link", "image", "video"],
              ["fullScreen", "showBlocks", "codeView"],
            ],
            imageWidth: "800px",
            imageHeight: "400px",
            videoHeight: "400px",
            videoWidth: "771px",
            addTagsWhitelist: "div,img,span",
            mediaAutoSelect: false,
            imageMultipleFile: true,
            imageFileInput: true,
            imageUploadUrl: "",
            imageResizing: true,
            imageUrlInput: false,
            imageHeightShow: false,
            imageAlignShow: false,
            imageRotation: false,
            paragraphTags: false,
            defaultTag: "",
            formats

          }}
        />
      </Box>
    </Box>
  );
};

export default ConteudoEditor;