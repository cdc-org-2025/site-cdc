import React, { useState, useEffect } from 'react';
import { Box, Label, DropZone, Icon, Text } from '@adminjs/design-system';

const ImageEditor = (props) => {
  const { record, onChange, property } = props;

  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    // Este código só rodará na tela de 'edit', então a verificação de 'record.id' é implícita.
    if (record?.params?.imagens) {
      setExistingImages(record.params.imagens);
    }
    // Limpa o valor da propriedade de upload ao carregar para evitar re-uploads acidentais
    onChange(property.name, undefined);
  }, [record?.params?.imagens]);

  const handleRemoveExistingImage = (imageId) => {
    onChange(`imagesToDelete.${imageId}`, imageId);
    setExistingImages(existingImages.filter((img) => img.id !== imageId));
  };

  const getImageUrl = (path) => `https://storage.googleapis.com/cdc-site/${path}`;
  const getFileName = (path) => (path ? path.split('/').pop() : '');

  return (
    <Box marginBottom="xxl">
      {
        existingImages.length > 0 ? (
          <>
            <Label>Imagens Salvas</Label>

            <Box variant="white" boxShadow="card" p="lg" borderRadius="default" mb="lg">
              {

                existingImages.map((image) => (
                  <Box key={image.id} display="flex" alignItems="center" py="sm" px="md" mb="sm" border="1px solid" borderColor="grey40" borderRadius="default">
                    <Box width="40px" height="40px" mr="lg" flexShrink={0} bg="grey20">
                      <img src={getImageUrl(image.url_imagem)} alt={getFileName(image.url_imagem)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Text variant="sm" style={{ flexGrow: 1, wordBreak: 'break-all' }}>
                      {getFileName(image.url_imagem)}
                    </Text>
                    <Box as="button" type="button" onClick={() => handleRemoveExistingImage(image.id)} ml="lg" p="sm" style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}>
                      <Icon icon="X" color="grey60" />
                    </Box>
                  </Box>
                ))
              }
            </Box>
          </>

        ) : <></>
      }
      <>
        <Label>Adicionar Novas Imagens</Label>

        <Box variant="white" boxShadow="card" p="lg" borderRadius="default">
          <DropZone onChange={(files) => onChange(property.name, files)} multiple />
        </Box>
      </>

    </Box>
  );
};

export default ImageEditor;