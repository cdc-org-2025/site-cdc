import React, { useState, useRef } from 'react';
import { Box, TextArea } from '@adminjs/design-system';
import SunEditor from 'suneditor-react';
import axios from 'axios';

const EDITOR_CSS = `
  /* limita o escopo ao editor */
  .sun-editor .se-wrapper-wysiwyg .sun-editor-editable {
    color: #000;
  }

  /* Parágrafos e listas */
  .sun-editor .se-wrapper-wysiwyg p,
  .sun-editor .se-wrapper-wysiwyg li {
    font-size: 18px !important;
    line-height: 1.6 !important;
    font-weight: 400 !important;
    color: #000 !important;
  }
  .sun-editor .se-wrapper-wysiwyg p { margin: 0 0 16px !important; }
  .sun-editor .se-wrapper-wysiwyg ul,
  .sun-editor .se-wrapper-wysiwyg ol {
    padding-left: 40px !important;
    padding-right: 20px !important;
    box-sizing: border-box !important;
    margin-top: 16px !important;
    margin-bottom: 16px !important;
  }
  .sun-editor .se-wrapper-wysiwyg li { margin-bottom: 8px !important; }
  .sun-editor .se-wrapper-wysiwyg li > p { margin: 0 !important; }

  /* Títulos */
  .sun-editor .se-wrapper-wysiwyg h1 {
    font-size: 32px !important;
    line-height: 1.3 !important;
    font-weight: 700 !important;
    color: #A7181D !important;
    margin: 24px 0 12px !important;
  }
  .sun-editor .se-wrapper-wysiwyg h2 {
    font-size: 24px !important;
    line-height: 1.4 !important;
    font-weight: 600 !important;
    color: #333333 !important;
    margin: 24px 0 12px !important;
  }

  /* Citação */
  .sun-editor .se-wrapper-wysiwyg blockquote {
    border-left: 3px solid #A7181D !important;
    padding-left: 12px !important;
    margin: 16px 0 !important;
    font-style: italic !important;
    font-size: 24px !important;
    line-height: 1.6 !important;
    color: #000 !important;
  }
  .sun-editor .se-wrapper-wysiwyg blockquote p {
    font-size: 24px !important;
    line-height: 1.6 !important;
    margin: 0 !important;
    color: #000 !important;
    font-weight: 400 !important;
  }

  /* Vídeo */
  .sun-editor .se-wrapper-wysiwyg iframe {
    width: 800px !important;
    height: 400px !important;
    display: block !important;
    margin: 20px auto !important;
  }
`;

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

  // 0) Remove font-size/line-height de tudo (spans, lis, etc.)
  Array.from(tempDiv.querySelectorAll('*')).forEach((el) => {
    if (el.style) {
      el.style.removeProperty?.('font-size');
      el.style.removeProperty?.('line-height');
      // Se veio no atributo style em texto
      if (el.getAttribute('style')) {
        el.setAttribute(
          'style',
          el
            .getAttribute('style')
            .replace(/font-size\s*:\s*[^;]+;?/gi, '')
            .replace(/line-height\s*:\s*[^;]+;?/gi, '')
            .trim()
        );
      }
    }
  });

  tempDiv.querySelectorAll('b, strong').forEach((el) => {
    el.style.fontWeight = '700';
  });

  // Caso o SunEditor use <span style="font-weight: ...">
  tempDiv.querySelectorAll('span[style*="font-weight"]').forEach((el) => {
    // se for bold/bolder/>=600, fixa em 700 para consistência
    const st = el.getAttribute('style') || '';
    if (/font-weight\s*:\s*(bold|bolder|[6-9]00)/i.test(st)) {
      el.style.fontWeight = '700';
    }
  });

  // 1) Título principal (h1) — vermelho
  tempDiv.querySelectorAll('h1').forEach((el) => {
    el.style.fontSize = '32px';
    el.style.color = '#A7181D';
    el.style.fontWeight = '700';
    el.style.lineHeight = '1.3';
    el.style.margin = '24px 0 12px';
  });

  // 2) Subtítulo (h2)
  tempDiv.querySelectorAll('h2').forEach((el) => {
    el.style.fontSize = '24px';
    el.style.color = '#333333';
    el.style.fontWeight = '600';
    el.style.lineHeight = '1.4';
    el.style.margin = '24px 0 12px';
  });

  // 3) Parágrafos
  tempDiv.querySelectorAll('p').forEach((el) => {
    el.style.fontSize = '18px';
    el.style.color = '#000000';
    el.style.lineHeight = '1.6';
    el.style.fontWeight = '400';
    el.style.margin = '0 0 16px';
  });

  // 4) Listas (aplique no LI para vencer inline vindo do editor)
  tempDiv.querySelectorAll('ul, ol').forEach((list) => {
    list.style.paddingLeft = '40px';
    list.style.paddingRight = '20px';
    list.style.boxSizing = 'border-box';
    list.style.marginTop = '16px';
    list.style.marginBottom = '16px';
    list.style.fontSize = '18px';

  });

  tempDiv.querySelectorAll('li').forEach((li) => {
    li.style.fontSize = '18px';
    li.style.lineHeight = '1.6';
    li.style.marginBottom = '8px';
    li.style.color = '#000000';
    // Alguns editores embutem <p> dentro de <li>; normaliza também
    const p = li.querySelector('p');
    if (p) {
      p.style.fontSize = '18px';
      p.style.lineHeight = '1.6';
      p.style.margin = '0';
      p.style.color = '#000000';
      p.style.fontWeight = '400';
    }
  });

  // 5) Blockquote
  tempDiv.querySelectorAll('blockquote').forEach((el) => {
    el.style.borderLeft = '3px solid #A7181D';
    el.style.paddingLeft = '12px';
    el.style.margin = '16px 0';
    el.style.fontStyle = 'italic';
    el.style.fontSize = '24px';
    el.style.color = '#000000';
    el.style.lineHeight = '1.6';
  });
  // Caso o editor gere blockquote > p
  tempDiv.querySelectorAll('blockquote p').forEach((p) => {
    p.style.fontSize = '24px';
    p.style.lineHeight = '1.6';
    p.style.margin = '0';
    p.style.color = '#000000';
    p.style.fontWeight = '400';
  });

  // 6) Iframe (vídeo)
  tempDiv.querySelectorAll('iframe').forEach((el) => {
    el.style.width = '800px';
    el.style.height = '400px';
    el.style.display = 'block';
    el.style.margin = '20px auto';
    el.setAttribute('width', '800');
    el.setAttribute('height', '400');
  });

  // 7) Remove spans <font> e spans vazios que só serviam para tamanho
  tempDiv.querySelectorAll('span, font').forEach((el) => {
    const onlyStyle = el.getAttribute('style');
    if (!el.textContent.trim() && !el.querySelector('*')) {
      el.remove();
    } else if (onlyStyle && !onlyStyle.trim()) {
      el.removeAttribute('style');
    }
  });

  // 8) Links
  tempDiv.querySelectorAll('a').forEach((a) => {
    // se não tiver href, remove
    if (!a.getAttribute('href')) {
      a.remove();
      return;
    }
    // boas práticas
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    // estilo padrão de link
    a.style.color = '#0645AD';
    a.style.textDecoration = 'underline';
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
      <style>{EDITOR_CSS}</style>
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