import { useState, useRef } from 'react';
import { Box} from '@adminjs/design-system';
import SunEditor from 'suneditor-react';

const formats = [
  { tag: 'h1', name: 'Titulo' },
  { tag: 'h2', name: 'Subtitulo' },
  { tag: 'p', name: 'Paragrafo' },
  { tag: 'blockquote', name: 'Citacao' },
  { tag: 'img', name: 'Imagem' },
  { tag: 'vdo', name: 'Video' },

];

//noticias/:id
// noticia_id = {
//   id: 1,
//   imagem_capa: "",
//   autor: "",
//   minutoLeitura: 3,
//   dataCreate: "",
  // "elements": [
  //   {
  //     "type": "Titulo",
  //     "content": "teste",
  //     "html": "<h1>teste</h1>"
  //   },
  //   {
  //     "type": "Citacao",
  //     "content": "teste",
  //     "html": "<blockquote><div>teste<br></div></blockquote>"
  //   }
  // ],
//   "htmlOriginal": "<h1>teste</h1><blockquote><div>teste<br></div></blockquote><h1><br></h1>"
// }

// //noticias/area
// noticias = [
//   {
//     url_imagem: "",
//     area: "",
//     titulo: ""
//   }
// ]


// publicacao = [
//   {
//     url_imagem: "",
//     area: "",
//     titulo: ""
//   }
// ]

// "linha-tempo" = [
//   {
//     id: 1,
//     ano: 2000,
//     titulo: "",
//     descricao: "",
//     imagem: []
//   },
// ]

// perguntas = [
//   {
//     id: 1,
//     pergunta: "",
//     resposta: ""
//   }
// ]

// //colaboradores/area
// colaboradores = [
//   {
//     email: "",
//     id: 1,
//     url_imagem: "",
//     area: "",
//     cargo: "",
//     nome: ""
//   }
// ]

// //programas/:id
// programa_id = {
//   id: 1,
//   imagem_capa: "",
//   titulo: "",
//   descricao: "",
//   imagens: [
//     {
//       url_imagem: "",
//     }
//   ],
//   area:""
// }

// //programas
// programas = {
//   programas: [
//     {
//       id: 1,
//       titulo: "",
//       subTitulo: "",
//       descricao: "",
//       url_imagem: "",
//     }
//   ],
//   qtd_programas: 1000
// }

// parceiros = [
//   {
//     id: 1,
//     url_imagem: "",
//     descriacao: "",
//   }
// ]

// organizacao = [
//   {
//     id: 1,
//     url_imagem: "",
//     titulo: "",
//     descriacao: ""
//   }
// ]

// dados_bancarios = {
//   url_imagem: "",
//   banco: "",
//   agencia: "",
//   titular: ""
// }

// //transparencia/area=""
// transparencia= [
//   {
//     id:1,
//     url_imagem: "",
//     area:"",
//     titulo:""
//   }
// ]

// //transparencia/:id
// transparencia_id={
//   url_doc:""
// }

// oportunidades= [
//   {
//     id:1,
//     titulo:""
//   }
// ]

// //oportunidades/:id
// oportunidade_id= {
//   id:1,
//   elements: [
//     {
//       "type": "Titulo",
//       "content": "teste",
//       "html": "<h1>teste</h1>"
//     },
//     {
//       "type": "Citacao",
//       "content": "teste",
//       "html": "<blockquote><div>teste<br></div></blockquote>"
//     }
//   ],
// }

// areas = [
//   {
//     id:1,
//     nome:""
//   }
// ]






const extractOrderedContent = (html) => {
  if (!html) return { elements: [], htmlOriginal: '' };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;
    const elements = body.childNodes;
    const result = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.nodeType === Node.ELEMENT_NODE) {
        const tag = element.tagName.toLowerCase();
        const text = element.textContent?.trim() || '';

        if (text || tag === 'img') { // Permite imagens mesmo sem texto
          result.push({
            type: formats.find(e => e.tag === tag).name,
            content: text,
            html: element.outerHTML
          });
        }
      }
    }

    return {
      elements: result,
      htmlOriginal: html
    };
  } catch (e) {
    console.error('Error parsing HTML:', e);
    return {
      elements: [],
      htmlOriginal: html
    };
  }
};

const ConteudoEditor = (props) => {
  const { onChange, property, record } = props;



  const initialData = record.params[property.path] || { conteudo: '<h1><br></h1>' };
  const [content, setContent] = useState(initialData.conteudo);
  const [htmlContent, setHtmlContent] = useState(initialData.html);
  const [structuredContent, setStructuredContent] = useState(initialData.structured);

  const editorRef = useRef(null);

  // const handleEditorChange = (content) => {
  //   setContent(content);
  //   onChange(property.path, content); // envia para o AdminJS imediatamente
  // };

  const handleEditorChange = (newHtml) => {
    setHtmlContent(newHtml);
  
    const extracted = extractOrderedContent(newHtml);
    setStructuredContent(extracted);
  
    // 🔥 Envia separadamente para os campos corretos
    onChange('conteudo', extracted.elements);
    onChange('html_original', extracted.htmlOriginal);
  };
  

  return (
    <Box>
      <Box mt="xl">
        <SunEditor
          ref={editorRef}
          setContents={content}
          onChange={handleEditorChange}
          setOptions={{
            height: 300,
            buttonList: [
              ['undo', 'redo'],
              ['formatBlock'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor'],
              ['align', 'list', 'table'],
              ['link', 'image', 'video'],
              ['fullScreen', 'showBlocks', 'codeView'],
            ],
            formats,
            imageUploadUrl: '', // Desativa upload padrão
            imageFileInput: true,
            imageResizing: true,
            placeholder: "Comece digitando seu título...",

          }}
        />
      </Box>

    </Box>
  );
};

export default ConteudoEditor;
