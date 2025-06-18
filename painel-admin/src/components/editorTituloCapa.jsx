// import { useState, useRef } from 'react';
// import { Box } from '@adminjs/design-system';
// import SunEditor from 'suneditor-react';

// const formats = [
//     { tag: 'h3', name: 'Título Principal' },
// ];

// // Força inline no conteúdo
// function convertStylesToInline(html) {
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = html;

//     tempDiv.querySelectorAll('h3').forEach(el => {
//         el.style.fontFamily = 'Lato';
//         el.style.fontSize = '48px';
//         el.style.fontWeight = '700';
//         el.style.lineHeight = '1.2';
//         el.style.letterSpacing = '0';
//         el.style.verticalAlign = 'middle';
//         if (!el.style.color || el.style.color === '') {
//             el.style.color = '#ffffff';
//         }
//     });

//     tempDiv.querySelectorAll('span[style*="#FE9A03"]').forEach(el => {
//         el.style.color = '#FE9A03';
//         el.style.fontWeight = '700';
//     });

//     return tempDiv.innerHTML;
// }

// const CapaTituloEditor = (props) => {
//     const { onChange, property, record } = props;
//     const [content, setContent] = useState(record.params['titulo'] || '');
//     const editorRef = useRef(null);

//     const handleEditorChange = (newHtml) => {
//         const styledHtml = convertStylesToInline(newHtml);
//         setContent(styledHtml);
//         onChange('titulo', styledHtml);
//     };

//     return (
//         <Box>
//             <Box mt="xl">

//                 <SunEditor
//                     ref={editorRef}
//                     setContents={content}
//                     onChange={handleEditorChange}
//                     className="meu-editor-escuro"
//                     setOptions={{
//                         height: 200,
//                         defaultTag: 'h3',
//                         iframe: false, // Importante para aplicar estilos diretos
//                         buttonList: [
//                             ['formatBlock'],
//                             ['bold', 'underline', 'italic'],
//                             ['fontColor'],
//                             ['undo', 'redo'],
//                             ['removeFormat'],
//                             ['fullScreen'],
//                             ['codeView']
//                         ],
//                         formats,
//                         colorList: [
//                             ['#ffffff', '#000000', '#FE9A03', '#A7181D', '#333333']
//                         ],

//                     }}
//                 />
//             </Box>
//         </Box>
//     );
// };

// export default CapaTituloEditor;

import { useState, useRef, useEffect } from 'react';
import { Box } from '@adminjs/design-system';
import SunEditor from 'suneditor-react';

const formats = [{ tag: 'h1', name: 'Título Principal' }];

function convertStylesToInline(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  tempDiv.querySelectorAll('h1').forEach(el => {
    el.style.fontFamily = 'Lato';
    el.style.fontSize = '48px';
    el.style.fontWeight = '700';
    el.style.lineHeight = '1.2';
    el.style.letterSpacing = '0';
    el.style.verticalAlign = 'middle';
    if (!el.style.color || el.style.color === '') {
      el.style.color = '#ffffff';
    }
  });

  tempDiv.querySelectorAll('span[style*="#FE9A03"]').forEach(el => {
    el.style.color = '#FE9A03';
    el.style.fontWeight = '700';
  });

  return tempDiv.innerHTML;
}

const CapaTituloEditor = (props) => {
  const { onChange, property, record } = props;
  const [content, setContent] = useState(record.params['titulo'] || '');
  const editorRef = useRef(null);

  const handleEditorChange = (newHtml) => {
    const styledHtml = convertStylesToInline(newHtml);
    setContent(styledHtml);
    onChange('titulo', styledHtml);
  };

  // Aplica classe na raiz real do editor
  useEffect(() => {
    const interval = setInterval(() => {
      const editorEl = document.querySelector('.sun-editor');
      if (editorEl && !editorEl.classList.contains('meu-editor-escuro')) {
        editorEl.classList.add('meu-editor-escuro');
        clearInterval(interval); // para de tentar depois de encontrar
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Box mt="xl">
        <SunEditor
          ref={editorRef}
          setContents={content}
          onChange={handleEditorChange}
          setOptions={{
            height: 200,
            defaultTag: 'h1',
            iframe: false,
            buttonList: [
              ['formatBlock'],
              ['bold', 'underline', 'italic'],
              ['fontColor'],
              ['undo', 'redo'],
              ['removeFormat'],
              ['fullScreen'],
              ['codeView'],
            ],
            formats,
            colorList: [['#ffffff', '#000000', '#FE9A03', '#A7181D', '#333333']],
          }}
        />
      </Box>
    </Box>
  );
};

export default CapaTituloEditor;
