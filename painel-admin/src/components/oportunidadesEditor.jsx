import { useState, useRef } from 'react';
import { Box, TextArea } from '@adminjs/design-system';
import SunEditor from 'suneditor-react';

const formats = [
    // { tag: 'h1', name: 'Titulo' },
    { tag: 'h2', name: 'Subtitulo' },
    { tag: 'p', name: 'Descricao' },

];

function convertStylesToInline(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Estilos para <h2>
    tempDiv.querySelectorAll('h2').forEach(el => {
        el.style.fontSize = '28px';
        el.style.color = '#000000';
        el.style.fontWeight= '500'
        // el.style.margin = '12px 0';
    });

    // Estilos para <p>
    tempDiv.querySelectorAll('p').forEach(el => {
        el.style.fontSize = '18px';
        el.style.lineHeight = '1.6';
        el.style.color = '#000000';
        // el.style.margin = '8px 0';
    });

    return tempDiv.innerHTML;
}


const OportunidadeEditor = (props) => {
    const { onChange, property, record } = props;

    const initialData = record.params[property.path] || {
        titulo: '',
        conteudo: '<p><br></p>',
    };

    const [titulo, setTitulo] = useState(initialData.titulo || '');
    const [content, setContent] = useState(initialData.conteudo);
    const [htmlContent, setHtmlContent] = useState(initialData.html);
    const [structuredContent, setStructuredContent] = useState(initialData.structured);

    const editorRef = useRef(null);

    // const handleEditorChange = (newHtml) => {
    //     setHtmlContent(newHtml);

    //     // const extracted = extractOrderedContent(newHtml);
    //     // setStructuredContent(extracted);

    //     // Aqui está o mais importante:
    //     console.log(newHtml)
    //     onChange('descricao', newHtml); // 👈 envia o HTML puro para o campo descricao
    // };
    const handleEditorChange = (newHtml) => {
        const htmlWithInlineStyles = convertStylesToInline(newHtml);
        setHtmlContent(htmlWithInlineStyles);
        onChange('descricao', htmlWithInlineStyles); // Salva com estilos inline
    };

    const handleTituloChange = (e) => {
        const newTitulo = e.target.value;
        setTitulo(newTitulo);
        onChange('titulo', newTitulo);
    };

    const openCustomUploader = () => {
        setUploaderOpen(true);
    };

    const handleImageSelected = async (file) => {
        const url = await uploadImageToServer(file);
        insertImage(url);
        setUploaderOpen(false);
    };

    const insertImage = (url) => {
        if (editorRef.current) {
            editorRef.current.editor.insertHTML(`<img src="${url}" style="max-width: 100%;" />`);
        }
    };


    return (
        <Box>
            {/* Campo de título */}
            <TextArea
                placeholder="Digite o título da oportunidade"
                value={titulo}
                onChange={handleTituloChange}
                rows={2}
                sm={12}
                borderless
                style={{
                    width: '100%',
                    cursor: 'text',
                    fontSize: '28px',
                    //   fontWeight: 'bold',
                    // border: "none",
                    color: "#222222",
                    // paddingLeft: '48px',
                    //   lineHeight: '1.3',
                    // border:
                }}
            />

            {/* Editor de conteúdo */}
            <Box mt="xl" className="oportunidade">
                <SunEditor
                    ref={editorRef}
                    setContents={content}
                    onChange={handleEditorChange}
                    setOptions={{
                        height: 300,
                        buttonList: [
                            ['undo', 'redo'],
                            ['formatBlock'],
                            ['fullScreen'],
                        ],
                        formats,
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

export default OportunidadeEditor;