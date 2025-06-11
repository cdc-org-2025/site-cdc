// Crie um novo arquivo de helpers, ex: admin.helpers.js
// ou defina no topo do seu admin.js

import { Components } from "../src/components.js";

export const createImageUploadProperties = (displayOnList = true) => ({
    url_imagem: {
        isVisible: { list: displayOnList, show: true, edit: false },
        components: {
            list: Components.ImageListPreview,
            show: Components.ImageListPreview,
        },
    },
    uploadImagem: {
        type: 'file',
        isVisible: { edit: true, list: false, show: false, filter: false },
        isArray: false,
    },
});