import React, { useState, useEffect } from 'react'
import SunEditor from 'suneditor-react';

const MAX_CHARS = 255

const ConteudoRichTextLimitado = ({ property, record, onChange }) => {
  const initialValue = record.params['conteudo'] || ''
  const [content, setContent] = useState(initialValue)
  const [charCount, setCharCount] = useState(0)

  // Atualiza a contagem ao carregar
  useEffect(() => {
    const text = initialValue.replace(/<[^>]+>/g, '')
    setCharCount(text.length)
  }, [initialValue])

  const handleChange = (val) => {
    const plainText = val.replace(/<[^>]+>/g, '')
    if (plainText.length <= MAX_CHARS) {
      setContent(val)
      setCharCount(plainText.length)
      onChange('conteudo', val)
    }
  }

  return (
    <div>
      <SunEditor
        setContents={content}
        onChange={handleChange}
        style={{marginBotton:"10px"}}
        setOptions={{
          height: 200,
          buttonList: [
            ['bold', 'underline', 'italic', 'list', 'align', 'fontSize'],
          ],
        }}
      />
      <p style={{ marginTop: '8px' }}>
        <strong>{charCount}</strong> / {MAX_CHARS} caracteres
      </p>
    </div>
  )
}

export default ConteudoRichTextLimitado
