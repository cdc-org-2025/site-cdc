import { Box } from '@adminjs/design-system';

function truncateHtml(html, maxLength = 150) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  let charCount = 0;
  const truncateNode = (node) => {
    if (charCount >= maxLength) {
      node.remove();
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const remaining = maxLength - charCount;
      if (node.textContent.length > remaining) {
        node.textContent = node.textContent.slice(0, remaining) + '...';
        charCount = maxLength;
      } else {
        charCount += node.textContent.length;
      }
    }

    if (node.childNodes) {
      Array.from(node.childNodes).forEach(truncateNode);
    }
  };

  Array.from(tempDiv.childNodes).forEach(truncateNode);
  return tempDiv.innerHTML;
}

const OportunidadePreview = (props) => {
  const { record, property } = props;
  const rawHtml = record.params[property.path] || '';

  const truncatedHtml = truncateHtml(rawHtml, 200); // limite de 200 caracteres

  return (
    <Box style={{ whiteSpace: 'pre-wrap' }}>
      <div dangerouslySetInnerHTML={{ __html: truncatedHtml }} />
    </Box>
  );
};

export default OportunidadePreview;

