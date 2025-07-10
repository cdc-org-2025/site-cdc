import React, { useState, useRef } from 'react';
import { Box, TextArea } from '@adminjs/design-system';
import SunEditor from 'suneditor-react';


const ConteudoRichTextLimitado = (props) => {
  const { onChange, property, record } = props;

  const initialData = record.params['conteudo'] || {
    titulo: '',
    conteudo: '<p><br></p>',
  };

  const editorRef = useRef(null);

  const handleSetInstance = (instance) => {
    editorRef.current = instance;
  };

  const handleEditorChange = (newHtml) => {
    onChange('conteudo', newHtml);
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
          }}
        />
      </Box>
    </Box>
  );
};

export default ConteudoRichTextLimitado;
