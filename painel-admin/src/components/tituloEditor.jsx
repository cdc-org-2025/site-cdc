import { useState, useRef } from 'react';
import { Box, TextArea } from '@adminjs/design-system';
// import SunEditor from 'suneditor-react';

// const formats = [
//     // { tag: 'h1', name: 'Titulo' },
//     { tag: 'h2', name: 'Subtitulo' },
//     { tag: 'p', name: 'Descricao' },

// ];

const TituloEditor = (props) => {
    const { onChange, property, record } = props;

    const initialData = record.params[property.path] || {
        titulo: '',
    };

    const [titulo, setTitulo] = useState(initialData.titulo || '');

    const handleTituloChange = (e) => {
        const newTitulo = e.target.value;
        setTitulo(newTitulo);
        onChange('titulo', newTitulo);
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
                    fontSize: '22px',
                    //   fontWeight: 'bold',
                    // border: "none",
                    color: "#222222",
                    // paddingLeft: '48px',
                    //   lineHeight: '1.3',
                    // border:
                }}
            />

        </Box>
    );
};

export default TituloEditor;