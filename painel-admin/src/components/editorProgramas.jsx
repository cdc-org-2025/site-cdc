import { useState, useRef } from 'react';
import { Box } from '@adminjs/design-system';
import SunEditor from 'suneditor-react';


const ProgramaEditor = (props) => {
    const { onChange, property, record } = props;

    // const initialData = record.params['conteudo'] || {
    //     titulo: '',
    //     conteudo: '<p><br></p>',
    // };

    const [content, setContent] = useState(record.params['descricao']);

    const editorRef = useRef(null);

    const handleEditorChange = (newHtml) => {
        onChange('descricao', newHtml); // Salva com estilos inline
    };

    return (
        <Box>
            
            {/* Editor de conteúdo */}
            <Box mt="xl" className="oportunidade">
                <SunEditor
                    ref={editorRef}
                    setContents={content}
                    onChange={handleEditorChange}
                    setOptions={{
                        height: 300,
                        buttonList: [
                            ["undo", "redo"],
                            ["formatBlock"],
                            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                            // ["fontColor", "hiliteColor"],
                            // ["align", "list", "table"],
                            // ["link", "image", "video"],
                            ["fullScreen"],
                        ],
                        // buttonList: [
                        //     ['undo', 'redo'],
                        //     ['formatBlock'],
                        //     ['fullScreen'],
                        // ],
                        // formats,
                        imageUploadUrl: '',
                        imageFileInput: false,
                        imageResizing: true,
                        iframe: false, // <--- importante
                        setDefaultStyle: `
                        h2 {
                            font-size: 24px;
                            color: #000;
                            margin: 12px 0;
                        }
                        `,
                        // placeholder: "Comece digitando seu título...",

                    }}
                />
            </Box>
        </Box>
    );
};

export default ProgramaEditor;