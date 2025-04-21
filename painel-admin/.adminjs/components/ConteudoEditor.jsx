import { useState, useEffect } from 'react';
import { BasePropertyComponent, Button, Box, Label, TextArea, Input } from 'adminjs';

const ConteudoEditor = (props) => {
  const { record, onChange, property } = props;
  const [sections, setSections] = useState(() => record.params[property.name] || []);

  useEffect(() => {
    onChange(property.name, sections);
  }, [sections]);

  const addSection = (type) => {
    const newSection = { type, content: '' };
    if (type === 'image') {
      newSection.src = '';
      newSection.alt = '';
    }
    setSections([...sections, newSection]);
  };

  const updateSection = (index, key, value) => {
    const updated = [...sections];
    updated[index][key] = value;
    setSections(updated);
  };

  const removeSection = (index) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  return (
    <Box>
      <Box mb="xl">
        <Button onClick={() => addSection('paragraph')} variant="primary" size="sm">Adicionar Parágrafo</Button>
        <Button onClick={() => addSection('image')} ml="default" variant="primary" size="sm">Adicionar Imagem</Button>
        <Button onClick={() => addSection('quote')} ml="default" variant="primary" size="sm">Adicionar Citação</Button>
      </Box>

      {sections.map((section, index) => (
        <Box key={index} mb="xl" p="default" border="default">
          <Label>Sessão {index + 1} ({section.type})</Label>
          {section.type === 'paragraph' && (
            <TextArea
              value={section.content}
              onChange={(e) => updateSection(index, 'content', e.target.value)}
            />
          )}
          {section.type === 'quote' && (
            <TextArea
              value={section.content}
              onChange={(e) => updateSection(index, 'content', e.target.value)}
            />
          )}
          {section.type === 'image' && (
            <>
              <Label>URL da Imagem</Label>
              <Input
                value={section.src}
                onChange={(e) => updateSection(index, 'src', e.target.value)}
              />
              <Label>Texto Alternativo</Label>
              <Input
                value={section.alt}
                onChange={(e) => updateSection(index, 'alt', e.target.value)}
              />
            </>
          )}
          <Box mt="sm">
            <Button onClick={() => removeSection(index)} size="sm" variant="danger">
              Remover Sessão
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ConteudoEditor;
