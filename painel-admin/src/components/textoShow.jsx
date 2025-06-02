import { Box, Text } from '@adminjs/design-system';

const TextoPreview = (props) => {
  const { record, property } = props;
  const rawHtml = record.params[property.path] || '';
  const titulo = record.params.titulo;
  const resumo = record.params.resumo || '';
  const dataPublicacao = record.params.data_publicacao
    ? new Date(record.params.data_publicacao).toLocaleDateString('pt-BR')
    : 'Sem data';
  const tipo = record.params.tipo || 'Sem tipo';

  const cleanText = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.querySelectorAll('script, style, iframe').forEach(el => el.remove());
    return tempDiv.textContent?.replace(/\n/g, ' ').trim() || '';
  };

  const previewText = cleanText(resumo); // estamos usando `resumo` aqui

  return (
    <Box
      style={{
        maxWidth: '480px',
        minWidth: '200px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'white',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box style={{ padding: '12px 16px' }}>
        <Text
          style={{
            // fontFamily: "'Segoe UI', Roboto, sans-serif",
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#000',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {previewText}
        </Text>
      </Box>
    </Box>
  );
};

export default TextoPreview;
