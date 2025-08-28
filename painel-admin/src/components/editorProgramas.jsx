import { useState, useRef } from 'react';
import { Box } from '@adminjs/design-system';
import SunEditor from 'suneditor-react';

function convertStylesToInline(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // 0) Remove font-size/line-height de tudo (spans, lis, etc.)
  Array.from(tempDiv.querySelectorAll('*')).forEach((el) => {
    if (el.style) {
      el.style.removeProperty?.('font-size');
      el.style.removeProperty?.('line-height');
      // Se veio no atributo style em texto
      if (el.getAttribute('style')) {
        el.setAttribute(
          'style',
          el
            .getAttribute('style')
            .replace(/font-size\s*:\s*[^;]+;?/gi, '')
            .replace(/line-height\s*:\s*[^;]+;?/gi, '')
            .trim()
        );
      }
    }
  });

  tempDiv.querySelectorAll('b, strong').forEach((el) => {
    el.style.fontWeight = '700';
  });

  // Caso o SunEditor use <span style="font-weight: ...">
  tempDiv.querySelectorAll('span[style*="font-weight"]').forEach((el) => {
    // se for bold/bolder/>=600, fixa em 700 para consistência
    const st = el.getAttribute('style') || '';
    if (/font-weight\s*:\s*(bold|bolder|[6-9]00)/i.test(st)) {
      el.style.fontWeight = '700';
    }
  });

  // 1) Título principal (h1) — vermelho
  tempDiv.querySelectorAll('h1').forEach((el) => {
    el.style.fontSize = '32px';
    el.style.color = '#A7181D';
    el.style.fontWeight = '700';
    el.style.lineHeight = '1.3';
    el.style.margin = '24px 0 12px';
  });

  // 2) Subtítulo (h2)
  tempDiv.querySelectorAll('h2').forEach((el) => {
    el.style.fontSize = '24px';
    el.style.color = '#333333';
    el.style.fontWeight = '600';
    el.style.lineHeight = '1.4';
    el.style.margin = '24px 0 12px';
  });

  // 3) Parágrafos
  tempDiv.querySelectorAll('p').forEach((el) => {
    el.style.fontSize = '18px';
    el.style.color = '#000000';
    el.style.lineHeight = '1.6';
    el.style.fontWeight = '400';
    el.style.margin = '0 0 16px';
  });

  // 4) Listas (aplique no LI para vencer inline vindo do editor)
  tempDiv.querySelectorAll('ul, ol').forEach((list) => {
    list.style.paddingLeft = '40px';
    list.style.paddingRight = '20px';
    list.style.boxSizing = 'border-box';
    list.style.marginTop = '16px';
    list.style.marginBottom = '16px';
    list.style.fontSize = '18px';

  });

  tempDiv.querySelectorAll('li').forEach((li) => {
    li.style.fontSize = '18px';
    li.style.lineHeight = '1.6';
    li.style.marginBottom = '8px';
    li.style.color = '#000000';
    // Alguns editores embutem <p> dentro de <li>; normaliza também
    const p = li.querySelector('p');
    if (p) {
      p.style.fontSize = '18px';
      p.style.lineHeight = '1.6';
      p.style.margin = '0';
      p.style.color = '#000000';
      p.style.fontWeight = '400';
    }
  });

  // 5) Blockquote
  tempDiv.querySelectorAll('blockquote').forEach((el) => {
    el.style.borderLeft = '3px solid #A7181D';
    el.style.paddingLeft = '12px';
    el.style.margin = '16px 0';
    el.style.fontStyle = 'italic';
    el.style.fontSize = '24px';
    el.style.color = '#000000';
    el.style.lineHeight = '1.6';
  });
  // Caso o editor gere blockquote > p
  tempDiv.querySelectorAll('blockquote p').forEach((p) => {
    p.style.fontSize = '24px';
    p.style.lineHeight = '1.6';
    p.style.margin = '0';
    p.style.color = '#000000';
    p.style.fontWeight = '400';
  });

  // 6) Iframe (vídeo)
  tempDiv.querySelectorAll('iframe').forEach((el) => {
    el.style.width = '800px';
    el.style.height = '400px';
    el.style.display = 'block';
    el.style.margin = '20px auto';
    el.setAttribute('width', '800');
    el.setAttribute('height', '400');
  });

  // 7) Remove spans <font> e spans vazios que só serviam para tamanho
  tempDiv.querySelectorAll('span, font').forEach((el) => {
    const onlyStyle = el.getAttribute('style');
    if (!el.textContent.trim() && !el.querySelector('*')) {
      el.remove();
    } else if (onlyStyle && !onlyStyle.trim()) {
      el.removeAttribute('style');
    }
  });

  // 8) Links
  tempDiv.querySelectorAll('a').forEach((a) => {
    // se não tiver href, remove
    if (!a.getAttribute('href')) {
      a.remove();
      return;
    }
    // boas práticas
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    // estilo padrão de link
    a.style.color = '#0645AD';
    a.style.textDecoration = 'underline';
  });

  tempDiv.querySelectorAll('span[style*="vertical-align"]').forEach((sp) => {
    const st = sp.getAttribute('style') || '';
    const isSup = /vertical-align\s*:\s*super/i.test(st);
    const isSub = /vertical-align\s*:\s*sub/i.test(st);

    if (isSup || isSub) {
      const tag = isSup ? 'sup' : 'sub';
      const el = document.createElement(tag);
      el.innerHTML = sp.innerHTML;

      // preserva cor se veio no span
      const colorMatch = st.match(/color\s*:\s*([^;]+);?/i);
      if (colorMatch) el.style.color = colorMatch[1].trim();

      sp.parentNode.replaceChild(el, sp);
    }
  });

  // 10) Normaliza estilo inline de <sup>/<sub> (mesmo do editor)
  tempDiv.querySelectorAll('sup, sub').forEach((el) => {
    el.style.fontSize = '75%';
    el.style.lineHeight = '0';
    el.style.position = 'relative';
    el.style.verticalAlign = 'baseline';
    if (el.tagName === 'SUP') {
      el.style.top = '-0.5em';
      el.style.removeProperty?.('bottom');
    } else {
      el.style.bottom = '-0.25em';
      el.style.removeProperty?.('top');
    }
  });


  return tempDiv.innerHTML;
}


const ProgramaEditor = (props) => {
  const { onChange, property, record } = props;

  // const initialData = record.params['conteudo'] || {
  //     titulo: '',
  //     conteudo: '<p><br></p>',
  // };

  const [content, setContent] = useState(record.params['descricao']);

  const editorRef = useRef(null);

  const handleEditorChange = (newHtml) => {
    const styledHtml = convertStylesToInline(newHtml);

    onChange('descricao', styledHtml); // Salva com estilos inline
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
            // buttonList: [
            //     ["undo", "redo"],
            //     ["formatBlock"],
            //     ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            //     // ["fontColor", "hiliteColor"],
            //     // ["align", "list", "table"],
            //     // ["link", "image", "video"],
            //     ["fullScreen"],
            // ],
            buttonList: [
              ["undo", "redo"],
              ["formatBlock"],
              ["bold", "underline", "italic", "strike", "subscript", "superscript"],
              ["fontColor", "hiliteColor"],
              ["align", "list", "table"],
              ["link"],
              ["fullScreen", "showBlocks"],
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
            addTagsWhitelist: "div,img,span,sup,sub",
            attributesWhitelist: {
              all: "style,class",
              a: "href|target|rel|class|style",
              sup: "style",
              sub: "style",
              span: "style",
            },
            pasteTagsWhitelist:
              "p,br,b,strong,i,em,u,s,a,ul,ol,li,h1,h2,h3,blockquote,img,iframe,sup,sub,span",


          }}
        />
      </Box>
    </Box>
  );
};

export default ProgramaEditor;