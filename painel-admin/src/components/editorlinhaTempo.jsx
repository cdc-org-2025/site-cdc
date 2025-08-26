import React, { useRef } from 'react';
import { Box } from '@adminjs/design-system';
import SunEditor from 'suneditor-react';

function convertStylesToInline(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  tempDiv.querySelectorAll('p').forEach(el => {
    el.style.fontSize = '1rem';
    el.style.color = 'rgb(0, 0, 0)';
    el.style.lineHeight = '1.6';
  });

  return tempDiv.innerHTML;
}

const ConteudoRichTextLimitado = (props) => {
  const { onChange, record } = props;
  const initialData = record.params['conteudo'] || '<p><br></p>';
  const editorRef = useRef(null);

  const handleSetInstance = (instance) => {
    editorRef.current = instance;
  };

  const handleEditorChange = (newHtml) => {
    const styledHtml = convertStylesToInline(newHtml);
    onChange('conteudo', styledHtml);
  };

  return (
    <Box>
      <Box mt="xl">
        <SunEditor
          getSunEditorInstance={handleSetInstance}
          placeholder="Digite algo aqui..."
          onChange={handleEditorChange}
          defaultValue={initialData}
          setOptions={{
            height: 200,
            buttonList: [
              ['bold', 'underline', 'italic', 'list', 'align', 'fontSize'],
            ],
            paragraphTags: false,
            defaultTag: '',
          }}
        />
      </Box>
    </Box>
  );
};

export default ConteudoRichTextLimitado;
