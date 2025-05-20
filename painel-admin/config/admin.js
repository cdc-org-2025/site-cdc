import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/sequelize'
import { initializeModels } from '../models/index.js'
import { sequelize } from './database.js'
import { Components, componentLoader } from '../src/components.js'
import { createUploadFeature } from './uploadStorage.js'
import readingTime from 'reading-time';



AdminJS.registerAdapter({ Database, Resource })

const models = initializeModels(sequelize)

export const adminJs = new AdminJS({
    assets: {
        styles: [
            '/css/suneditor.min.css',
            '/css/editor-custom.css'
        ], // 👈 adiciona aqui
    },
    resources: [
        {
            resource: models.Area, options: {
                navigation: 'Configurações',
                properties: {
                    nome: {
                        isTitle: true
                    }
                }
            }
        },
        {
            resource: models.Noticia,
            features: [
                createUploadFeature({
                    folder: 'noticias',
                    file: 'uploadCapa',
                    key: 'imagem_capa',
                    filePath: 'capa_filePath',
                    filesToDelete: 'capa_filesToDelete',
                    multiple: false,
                }),
            ],
            options: {
                navigation: 'Informe-se',
                actions: {
                    new: {
                        before: async (request) => {
                            if (request.payload?.html_original) {
                                const rawHtml = request.payload.html_original;

                                // Remove tags HTML e extrai só o texto
                                const plainText = rawHtml.replace(/<[^>]*>/g, ' ');
                                const tempoLeituraMin = Math.ceil(readingTime(plainText).minutes);

                                request.payload.tempo_leitura = tempoLeituraMin;
                            }
                            return request;
                        }
                    },
                    edit: {
                        before: async (request) => {
                            if (request.payload?.html_original) {
                                const rawHtml = request.payload.html_original;

                                const plainText = rawHtml.replace(/<[^>]*>/g, ' ');
                                const tempoLeituraMin = Math.ceil(readingTime(plainText).minutes);

                                request.payload.tempo_leitura = tempoLeituraMin;
                            }
                            return request;
                        }
                    }
                },
                properties: {
                    html_original: {
                        components: {
                            edit: Components.ConteudoEditor,
                            list: Components.NoticiaPreview,
                        },
                        isVisible: { list: true, edit: true, filter: false, show: true },
                    },
                    areaDeAtuacao: {
                        reference: 'areas',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                        label: 'Área de Atuação',
                        isArray: true,
                        components: {
                            list: Components.AreaListDisplay, // 👈 mostrar os nomes das áreas na lista
                            edit: Components.MultiSelectInput,
                        }

                    },
                    conteudo: {
                        isVisible: false
                    },
                    area_ids: {
                        isVisible: false
                    },

                    uploadCapa: {
                        type: 'mixed',
                        label: 'Imagem de Capa',
                        isVisible: { list: false, show: true, filter: false, edit: true },
                        components: {
                            edit: Components.UploadMultiple,
                        },
                    },

                    imagem_capa: {
                        isVisible: { list: true, edit: false, show: true },
                        components: {
                            list: Components.ImageListPreview,
                        },
                    },
                    titulo: {
                        isVisible: false
                    },
                    tipo: {
                        isVisible: false
                    }

                },
                editProperties: ['html_original', 'uploadCapa', 'areaDeAtuacao', 'autor'],
                showProperties: ['areaDeAtuacao', 'tempo_leitura', 'uploadCapa', 'autor', 'html_original']

            }
        },
        {
            resource: models.LinhaDoTempo,
            features: [
                createUploadFeature({
                    folder: 'linha_do_tempos',
                    file: 'uploadImagens',
                    key: 'url_imagem',
                    multiple: true,
                }),
            ],
            options: {
                navigation: 'Institucional',
                listProperties: ['id', 'url_imagem', 'titulo', 'conteudo', 'ano'],
                actions: {
                    new: {
                        after: async (response, request, context) => {
                            const { record } = context
                            if (!record || record.isValid() === false) return response

                            const imagens = Object.entries(request.files || {})
                                .filter(([key]) => key.startsWith('uploadImagens'))
                                .map(([, file]) => file)

                            const LinhaDoTempoImagem = models.LinhaDoTempoImagem

                            for (const imagem of imagens) {
                                const filename = imagem?.name?.replace(/\s+/g, '_')
                                const gcsPath = `linha_do_tempos/${record.id()}-${filename}`

                                await LinhaDoTempoImagem.create({
                                    linha_do_tempo_id: record.id(),
                                    url_imagem: gcsPath,
                                })
                            }

                            return response
                        }
                    },
                    list: {
                        after: async (response) => {
                            const imagens = await models.LinhaDoTempoImagem.findAll()

                            const imagensMap = imagens.reduce((acc, img) => {
                                const id = img.linha_do_tempo_id

                                if (!acc[id]) {
                                    acc[id] = []
                                }

                                acc[id].push(img.url_imagem) // 👉 guarda todas as imagens

                                return acc
                            }, {})

                            for (const record of response.records) {
                                const id = record.params.id
                                const imagemArray = imagensMap[id]

                                if (imagemArray) {
                                    record.params.url_imagem = imagemArray
                                }
                            }

                            return response
                        }
                    }
                },
                properties: {
                    titulo: { isTitle: true },
                    conteudo: { type: 'richtext' },
                    ano: { type: 'number' },
                    uploadImagens: {
                        type: 'mixed',
                        isVisible: { list: false, show: false, filter: false, edit: true },
                        components: {
                            edit: Components.UploadMultiple
                        },
                        custom: { multiple: true }
                    },
                    url_imagem: {
                        isVisible: { list: true, show: false, edit: false },
                        components: {
                            list: Components.ImageListPreview
                        }
                    }
                },
                editProperties: ['titulo', 'ano', 'conteudo', 'uploadImagens'],
                showProperties: ['titulo', 'ano', 'conteudo']
            }
        },
        {
            resource: models.Lideranca,
            options: {
                navigation: 'Institucional',
                properties: {
                    areaDeAtuacao: {
                        reference: 'areas',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                        label: 'Área de Atuação',
                        isArray: true,
                        components: {
                            list: Components.AreaListDisplay, // 👈 mostrar os nomes das áreas na lista
                            edit: Components.MultiSelectInput,
                        }

                    },
                    area_ids: {
                        isVisible: false
                    },
                    url_imagem: {
                        isVisible: { list: true, show: true, edit: false },
                        components: {
                            list: Components.ImageListPreview,
                            show: Components.ImageListPreview, // opcional, se quiser mostrar no "show"
                        }
                    },
                    uploadImagem: {
                        type: 'file',
                        isVisible: { edit: true, list: false, show: false, filter: false },
                        isArray: false, // 👈 isso força o AdminJS a usar `uploadImagem` ao invés de `uploadImagem.0`
                    },
                },
                editProperties: [
                    'nome',
                    'cargo',
                    'email',
                    'areaDeAtuacao',
                    'uploadImagem' // usado para enviar imagem
                ],
                showProperties: [
                    'nome',
                    'cargo',
                    'email',
                    'areaDeAtuacao',
                    'url_imagem'
                ],
                listProperties: [
                    'nome',
                    'cargo',
                    'email',
                    'areaDeAtuacao',
                    'url_imagem'
                ]
            },
            features: [
                createUploadFeature({
                    folder: 'colaboradores',
                    file: 'uploadImagem',
                    key: 'url_imagem',
                }),
            ],
        },
        {
            resource: models.Oportunidade,
            options: {
                navigation: 'Institucional',
                properties: {
                    titulo: {
                        isVisible: { list: true, edit: false, show: true }, // para esconder o campo padrão
                    },
                    descricao: {
                        components: {
                            edit: Components.OportunidadeEditor,
                            list: Components.NoticiaPreview, // novo componente para a listagem

                        }
                    },
                },
                listProperties: [
                    'titulo',
                    'descricao'
                ]
            }

        },
        {
            resource: models.Parceiro,
            features: [
                createUploadFeature({
                    folder: 'parceiros',
                    file: 'uploadImagem',
                    key: 'url_imagem',
                }),
            ],
            options: {
                navigation: 'Parceiros',
                properties: {
                    url_imagem: {
                        isVisible: { list: true, show: true, edit: false },
                        components: {
                            list: Components.ImageListPreview,
                            show: Components.ImageListPreview, // opcional, se quiser mostrar no "show"
                        }
                    },
                    uploadImagem: {
                        type: 'file',
                        isVisible: { edit: true, list: false, show: false, filter: false },
                        isArray: false, // 👈 isso força o AdminJS a usar `uploadImagem` ao invés de `uploadImagem.0`
                    },
                },
            }
        },
        {
            resource: models.Transparencia,
            options: {
                navigation: 'Institucional',
                properties: {
                    areaDeAtuacao: {
                        reference: 'areas',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                        label: 'Área de Atuação',
                        isArray: true,
                        components: {
                            list: Components.AreaListDisplay, // 👈 mostrar os nomes das áreas na lista
                            edit: Components.MultiSelectInput,
                        }

                    },
                    area_ids: {
                        isVisible: false
                    },
                    url_imagem: {
                        isVisible: { list: true, show: true, edit: false },
                        components: {
                            list: Components.ImageListPreview,
                            show: Components.ImageListPreview, // opcional, se quiser mostrar no "show"
                        }
                    },
                    uploadImagem: {
                        type: 'file',
                        isVisible: { edit: true, list: false, show: false, filter: false },
                        isArray: false, // 👈 isso força o AdminJS a usar `uploadImagem` ao invés de `uploadImagem.0`
                    },

                },
                editProperties: [
                    'titulo',
                    'areaDeAtuacao',
                    'documento_url',
                    'uploadImagem' // usado para enviar imagem
                ],
                showProperties: [
                    'titulo',
                    'documento_url',
                    'documento_url',
                    'url_imagem'
                ],
                listProperties: [
                    'titulo',
                    'documento_url',
                    'areaDeAtuacao',
                    'url_imagem'
                ]
            },
            features: [
                createUploadFeature({
                    folder: 'transparencia',
                    file: 'uploadImagem',
                    key: 'url_imagem',
                }),
            ],
        },
        {
            resource: models.Programa,
            features: [
                createUploadFeature({
                    folder: 'programa',
                    file: 'uploadCapa',
                    key: 'url_image_capa',
                }),
            ],
            options: {
                navigation: 'Programas',

                properties: {

                    area_ids: {
                        isVisible: false
                    },
                    areaDeAtuacao: {
                        reference: 'areas',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                        label: 'Área de Atuação',
                        isArray: true,
                        components: {
                            list: Components.AreaListDisplay, // 👈 mostrar os nomes das áreas na lista
                            edit: Components.MultiSelectInput,
                        }

                    },
                    uploadCapa: {
                        type: 'file',
                        isVisible: { edit: true, list: false, show: false, filter: false },
                        isArray: false,
                    },
                    url_image_capa: {
                        isVisible: { list: true, show: true, edit: false },
                        components: {
                            list: Components.ImageListPreview,
                            show: Components.ImageListPreview,
                        },
                    },
                },
                editProperties: [
                    'titulo',
                    'subtitulo',
                    'descricao',
                    'areaDeAtuacao',
                    'uploadCapa'
                ],
                showProperties: [
                    'titulo',
                    'subtitulo',
                    'descricao',
                    'areaDeAtuacao',
                    'url_image_capa'
                ],
                listProperties: [
                    'titulo',
                    'subtitulo',
                    'descricao',
                    'areaDeAtuacao',
                    'url_image_capa'
                ]
            },
        },
        {
            resource: models.Publicacao,
            features: [
                createUploadFeature({
                    folder: 'parceiros',
                    file: 'uploadImagem',
                    key: 'url_imagem',
                }),
            ],
            options: {
                navigation: 'Informe-se',
                properties: {
                    areaDeAtuacao: {
                        reference: 'areas',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                        label: 'Área de Atuação',
                        isArray: true,
                        components: {
                            list: Components.AreaListDisplay, // 👈 mostrar os nomes das áreas na lista
                            edit: Components.MultiSelectInput,
                        }

                    },
                    area_ids: {
                        isVisible: false
                    },
                    url_imagem: {
                        isVisible: { list: true, edit: false, show: true },
                        components: {
                            list: Components.ImageListPreview,
                        },
                    },
                    uploadImagem: {
                        type: 'file',
                        isVisible: { edit: true, list: false, show: false, filter: false },
                        isArray: false, // 👈 isso força o AdminJS a usar `uploadImagem` ao invés de `uploadImagem.0`
                    },
                },

                editProperties: [
                    'titulo',
                    'documento_url',
                    'areaDeAtuacao',
                    'uploadImagem' // usado para enviar imagem
                ],
                showProperties: [
                    'titulo',
                    'documento_url',
                    'areaDeAtuacao',
                    'url_imagem'
                ],
                listProperties: [
                    'titulo',
                    'documento_url',
                    'areaDeAtuacao',
                    'url_imagem'
                ]

            },
        },
        {
            resource: models.DadosBancario,
            options: {
                navigation: 'Configurações',
                properties: {
                    url_imagem: {
                        isVisible: { list: true, show: true, edit: false },
                        components: {
                            list: Components.ImageListPreview,
                            show: Components.ImageListPreview, // opcional, se quiser mostrar no "show"
                        }
                    },
                    uploadImagem: {
                        type: 'file',
                        isVisible: { edit: true, list: false, show: false, filter: false },
                        isArray: false, // 👈 isso força o AdminJS a usar `uploadImagem` ao invés de `uploadImagem.0`
                    },
                },
                editProperties: [
                    'titular_conta',
                    'agencia',
                    'banco',
                    'uploadImagem' // usado para enviar imagem
                ],
                showProperties: [
                    'titular_conta',
                    'agencia',
                    'banco',
                    'url_imagem'
                ]
            },
            features: [
                createUploadFeature({
                    folder: 'dados_bancarios',
                    file: 'uploadImagem',
                    key: 'url_imagem',
                }),
            ],

        },
        {
            resource: models.PerguntaFrequente,
            options: {
                navigation: 'Institucional',
                listProperties: [
                    'pergunta',
                    'resposta'
                ],
                showProperties: [
                    'pergunta',
                    'resposta'
                ],
                editProperties: [
                    'pergunta',
                    'resposta'
                ]
            }
        },
        {
            resource: models.CardInformativo,
            features: [
                createUploadFeature({
                    folder: 'cards',
                    file: 'uploadImagem',
                    key: 'url_imagem',
                }),
            ],
            options: {
                navigation: 'Informativos',
                properties: {
                    url_imagem: {
                        isVisible: { list: true, show: true, edit: false },
                        components: {
                            list: Components.ImageListPreview,
                            show: Components.ImageListPreview, // opcional, se quiser mostrar no "show"
                        }
                    },
                    uploadImagem: {
                        type: 'file',
                        isVisible: { edit: true, list: false, show: false, filter: false },
                        isArray: false, // 👈 isso força o AdminJS a usar `uploadImagem` ao invés de `uploadImagem.0`
                    },
                },
                editProperties: [
                    'titulo',
                    'descricao',
                    'tipo',
                    'uploadImagem' // usado para enviar imagem
                ],
                showProperties: [
                    'titulo',
                    'descricao',
                    'tipo',
                    'url_imagem'
                ],
                listProperties: [
                    'titulo',
                    'descricao',
                    'tipo',
                    'url_imagem'
                ]
            }
        },
        { resource: models.Email, options: { navigation: 'Configurações' } },
        {
            resource: models.Inidicador,
            options: {
                navigation: 'Informativos',
                editProperties: [
                    'descricao',
                    'quantidade',
                ],
                showProperties: [
                    'descricao',
                    'quantidade',
                ],
                listProperties: [
                    'descricao',
                    'quantidade',
                ]
            }
        },



    ],
    rootPath: '/admin',
    branding: {
        companyName: 'CDC',
        logo: '/assets/logo_cdc.svg',
        theme: {
            colors: {
                // Light Mode (default)
                primary100: '#a7181d',  // Vermelho principal
                primary80: '#c62828',
                primary60: '#e53935',
                primary20: '#ffcdd2',
                primary0: '#fff5e6',    // Fundo paper light
                accent: '#fe9a03',      // Laranja secundário
                hoverBg: '#cb7a01',     // Laranja escuro (hover)
                filterBg: '#f3f2ed',    // Fundo default light
                // Dark Mode (se necessário)
                darkBg: '#000',         // Fundo dark
                darkPaper: '#121212',   // Paper dark
                darkText: '#ffffff',    // Texto dark
            },
            fonts: {
                fontFamily: 'Lato, "Source Sans Pro", sans-serif', // Sua fonte principal
                fontSize: '16px',       // Tamanho base
            }
        }
    },
    locale: {
        language: 'pt-BR',
        availableLanguages: ['pt-BR'],
        translations: {
            labels: {
                loginWelcome: 'Bem-vindo ao Painel',
                Colaborador: 'Colaboradores',
                // você pode adicionar mais se quiser
            },
            messages: {
                loginWelcome: 'Seja bem-vindo! Por favor, entre para continuar.',
                successfullyBulkDeleted: 'Registros excluídos com sucesso',
                successfullyDeleted: 'Registro excluído com sucesso',
                successfullyUpdated: 'Registro atualizado com sucesso',
                successfullyCreated: 'Registro criado com sucesso',
                thereWereValidationErrors: 'Existem erros de validação - por favor, verifique!',
                forbiddenError: 'Você não tem permissão para executar esta ação',
                anyForbiddenError: 'Você não tem permissão para realizar esta ação',
                errorFetchingRecords: 'Erro ao buscar registros',
                errorFetchingRecord: 'Erro ao buscar o registro',
                noRecordsSelected: 'Nenhum registro selecionado',
                theseRecordsWillBeRemoved: 'Os seguintes registros serão removidos:',
                theseRecordsWillBeUpdated: 'Os seguintes registros serão atualizados:',
            },
            buttons: {
                save: 'Salvar',
                addNewItem: 'Adicionar novo item',
                filter: 'Filtrar',
                applyChanges: 'Aplicar alterações',
                resetFilter: 'Limpar filtros',
                confirmRemovalMany: 'Confirmar exclusão de vários',
                confirmRemovalOne: 'Confirmar exclusão',
                logout: 'Sair',
                login: 'Entrar',
                submit: 'Enviar',
                addNewProperty: 'Adicionar nova propriedade',
            },
            properties: {
                areaDeAtuacao: 'Área de Atuação',
                url_imagem: 'URL da Imagem',
                cargo: 'Cargo',
                nome: 'Nome',
                email: 'E-mail',
            },
            actions: {
                new: 'Criar Novo',
                edit: 'Editar',
                show: 'Exibir',
                delete: 'Excluir',
                bulkDelete: 'Excluir selecionados',
                list: 'Lista',
            },
        },
    },
    componentLoader,
});

adminJs.watch();

export const adminRouter = AdminJSExpress.buildRouter(adminJs)