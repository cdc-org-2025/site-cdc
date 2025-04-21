import { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, TextArea } from '@adminjs/design-system';

const ConteudoEditor = (props) => {
  const { onChange, property, record } = props;

  const initialData = record.params[property.path] || { titulo: '', conteudo: '' };

  const [titulo, setTitulo] = useState(initialData.titulo || '');
  const [content, setContent] = useState(initialData.conteudo || '');
  const textareaRef = useRef(null);

  const [showOptions, setShowOptions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const [currentStyle, setCurrentStyle] = useState({
    fontSize: '18px',
    color: '#000000'
  });

  const handleTextAreaChange = (e) => {
    setContent(e.target.value);
    updateCursorPosition(e.target);
  };

  const updateCursorPosition = (textarea) => {
    const cursorPos = textarea.selectionStart;
    setCursorPosition(cursorPos);

    const textLines = textarea.value.substr(0, cursorPos).split('\n');
    setCurrentLine(textLines.length - 1);

    calculateButtonPosition(textarea, textLines.length - 1);
  };

  const calculateButtonPosition = (textarea, lineNumber) => {
    const tempSpan = document.createElement('span');
    tempSpan.textContent = 'X';
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'pre-wrap';
    tempSpan.style.font = window.getComputedStyle(textarea).font;

    document.body.appendChild(tempSpan);

    const lineHeight = tempSpan.offsetHeight;
    document.body.removeChild(tempSpan);

    const parentRect = textarea.parentNode.getBoundingClientRect();
    const rect = textarea.getBoundingClientRect();
    const scrollTop = textarea.scrollTop;

    setButtonPosition({
      top: (rect.top - parentRect.top) + (lineNumber * lineHeight) - scrollTop + 5,
      left: 35
    });
  };

  const changeStyle = (type) => {
    let style = {};

    switch (type) {
      case 'subtitulo':
        style = { fontSize: '28px', color: '#000000' };
        break;
      case 'citacao':
        style = { fontSize: '23px', color: '#000000' };
        break;
      case 'texto':
      default:
        style = { fontSize: '18px', color: '#000000' };
    }

    setCurrentStyle(style);
    setShowOptions(false);

    setTimeout(() => {
      textareaRef.current.focus();
    }, 0);
  };

  const saveContent = () => {
    onChange(property.path, { titulo, conteudo: content });
  };

  useEffect(() => {
    if (textareaRef.current) {
      calculateButtonPosition(textareaRef.current, currentLine);
    }
  }, [content, currentLine]);

  return (
    <Box variant="grey" p="xl" borderRadius="lg" position="relative">
      {/* Campo de título */}
      <TextArea
        placeholder="Digite o título da notícia"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        rows={2}
        sm={12}
        borderless
        style={{
          width: '100%',
          cursor: 'text',
          fontSize: '32px',
          fontWeight: 'bold',
          border: "none",
          color: "#A7181D",
          paddingLeft: '48px',
          lineHeight: '1.3',
        }}
      />

      {/* Botão flutuante */}
      <Button
        variant="light"
        type="button"
        style={{
          width: '30px',
          height: '30px',
          padding: '0',
          borderRadius: '30%',
          backgroundColor: '#f3f3f3',
          position: 'absolute',
          top: `${buttonPosition.top}px`,
          left: `${buttonPosition.left}px`,
          zIndex: 10,
          transition: 'top 0.1s ease, left 0.1s ease'
        }}
        onClick={() => setShowOptions(!showOptions)}
      >
        +
      </Button>

      {/* Menu de opções */}
      {showOptions && (
        <Box
          style={{
            position: 'absolute',
            top: `${buttonPosition.top + 40}px`,
            left: `${buttonPosition.left}px`,
            zIndex: 20
          }}
          p="md"
          variant="white"
          borderRadius="md"
          boxShadow="card"
          display="flex"
        >
          <Button variant="text" size="lg" onClick={() => changeStyle('subtitulo')}>Subtítulo</Button>
          <Button variant="text" size="lg" onClick={() => changeStyle('citacao')}>Citação</Button>
          <Button variant="text" size="lg" onClick={() => changeStyle('texto')}>Texto</Button>
          <Button variant="text" size="lg" onClick={() => changeStyle('imagem')}>Imagem</Button>
        </Box>
      )}

      {/* Área de texto principal */}
      <TextArea
        ref={textareaRef}
        value={content}
        onChange={handleTextAreaChange}
        onKeyUp={(e) => updateCursorPosition(e.target)}
        onClick={(e) => updateCursorPosition(e.target)}
        rows={20}
        style={{
          width: '100%',
          paddingLeft: '50px',
          border: "none",
          fontSize: currentStyle.fontSize,
          color: currentStyle.color
        }}
        placeholder="Digite seu conteúdo aqui..."
      />
    </Box>
  );
};

export default ConteudoEditor;

