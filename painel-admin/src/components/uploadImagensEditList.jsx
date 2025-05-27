// admin/components/UploadMultiple.jsx
import React, { useState, useEffect } from 'react';
import { useRecord } from 'adminjs';

const UploadMultiple = (props) => {
  const { property } = props;
  const { record, handleChange } = useRecord(props);

  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    const imagens = record?.params?.imagem_url || [];
    if (Array.isArray(imagens)) {
      setExistingImages(imagens);
    }
  }, [record]);

  const removeExistingImage = (url) => {
    setExistingImages(prev => prev.filter(img => img !== url));
    handleChange('removedImages', [...(record.params.removedImages || []), url]);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setNewFiles(prev => [...prev, ...files]);

    files.forEach((file, index) => {
      handleChange(`${property.name}.${index}`, file);
    });
  };

  return (
    <div>
      <label>Imagens atuais:</label>
      {existingImages.map((img, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <img src={`/${img}`} alt="imagem atual" width="100" />
          <span>{img}</span>
          <button type="button" onClick={() => removeExistingImage(img)}>❌</button>
        </div>
      ))}

      <label>Adicionar novas imagens:</label>
      <input type="file" multiple onChange={handleFileChange} />
      <ul>
        {newFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UploadMultiple;
