import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ Caminho relativo para o bundler funcionar
const relativePath = './components/ConteudoEditor.jsx';

const componentLoader = new ComponentLoader();

const Components = {
  ConteudoEditor: componentLoader.add('ConteudoEditor', relativePath)
};

export { componentLoader, Components };
