import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/sequelize'
import { initializeModels } from '../models/index.js'
import { sequelize } from './database.js'
import { Components, componentLoader } from '../src/components.js'
import { createUploadFeature } from './uploadStorage.js'


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
                navigation: 'Conteúdo',
                properties: {
                    nome: {
                        isTitle: true
                    }
                }
            }
        },
        { resource: models.Categoria, options: { navigation: 'Conteúdo' } },
        {
            resource: models.Noticia,
            options: {
                navigation: 'Conteúdo',
                properties: {
                    conteudo: {
                        components: {
                            edit: Components.ConteudoEditor
                        },
                        isVisible: { list: true, edit: true, filter: false, show: true },
                        isValid: (value) => {
                            if (!value) return true;
                            return Array.isArray(value) &&
                                value.every(item => item.type && item.content && item.html);
                        }
                    },
                    areaDeAtuacao: {
                        reference: 'areas',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                        label: 'Área de Atuação',
                    },
                    area_id: {
                        isVisible: false, // Esconde o area_id bruto
                    },
                },
                editProperties: ['conteudo', 'areaDeAtuacao', 'tempo_leitura', 'imagem_capa', 'autor'],

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
                navigation: 'Conteúdo',
                listProperties: ['id', 'url_imagem', 'titulo', 'ano'],
                actions: {
                    new: {
                        after: async (response, request, context) => {
                            const { record } = context
                            if (!record || record.isValid() === false) return response

                            const imagens = Object.entries(request.files || {})
                                .filter(([key]) => key.startsWith('uploadImagens'))
                                .map(([, file]) => file)

                            const LinhaDoTempoImagem = models.LinhaDoTempoImagem
                            const bucketUrl = 'https://storage.googleapis.com/cdc-site'

                            for (const imagem of imagens) {
                                const filename = imagem?.name?.replace(/\s+/g, '_')
                                const gcsPath = `linha_do_tempos/${record.id()}-${filename}`

                                await LinhaDoTempoImagem.create({
                                    linha_do_tempo_id: record.id(),
                                    url_imagem: `${bucketUrl}/${gcsPath}`,
                                })
                            }

                            console.log(`📥 ${imagens.length} imagens associadas à linha do tempo ${record.id()}`)
                            return response
                        }
                    },
                    list: {
                        after: async (response) => {
                            const imagens = await models.LinhaDoTempoImagem.findAll()

                            const imagensMap = imagens.reduce((acc, img) => {
                                const id = img.linha_do_tempo_id
                                const relativePath = img.url_imagem.replace('https://storage.googleapis.com/cdc-site/', '')

                                if (!acc[id]) {
                                    acc[id] = []
                                }

                                acc[id].push(relativePath) // 👉 guarda todas as imagens

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

                    // list: {
                    //     after: async (response) => {
                    //       const imagens = await models.LinhaDoTempoImagem.findAll()
                    //       const imagensMap = imagens.reduce((acc, img) => {
                    //         if (!acc[img.linha_do_tempo_id]) {
                    //           acc[img.linha_do_tempo_id] = img.url_imagem
                    //         }
                    //         return acc
                    //       }, {})

                    //       for (const record of response.records) {
                    //         const id = record.params.id
                    //         const imagem = imagensMap[id]

                    //         if (imagem) {
                    //           // 👇 CORRIGIDO para compatibilidade com ImageListPreview
                    //           record.params.url_imagem = imagem.replace('https://storage.googleapis.com/cdc-site/', '')
                    //         }
                    //       }

                    //       return response
                    //     }
                    //   }

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


        // {
        //     resource: models.LinhaDoTempo,
        //     options: {
        //         navigation: 'Conteúdo',
        //         actions: {
        //             new: {
        //                 after: async (response, request, context) => {
        //                     const { record } = context
        //                     if (!record || record.isValid() === false) return response

        //                     const imagens = Object.entries(request.files || {})
        //                         .filter(([key]) => key.startsWith('uploadImagens'))
        //                         .map(([, file]) => file)

        //                     const LinhaDoTempoImagem = models.LinhaDoTempoImagem
        //                     const bucketUrl = 'https://storage.googleapis.com/cdc-site'

        //                     for (const imagem of imagens) {
        //                         const filename = imagem?.name?.replace(/\s+/g, '_')
        //                         const gcsPath = `linha_do_tempos/${record.id()}-${filename}`

        //                         await LinhaDoTempoImagem.create({
        //                             linha_do_tempo_id: record.id(),
        //                             url_imagem: `${bucketUrl}/${gcsPath}`,
        //                         })
        //                     }

        //                     console.log(`📥 ${imagens.length} imagens associadas à linha do tempo ${record.id()}`)
        //                     return response
        //                 }
        //             }
        //         },
        //         properties: {
        //             titulo: { isTitle: true },
        //             conteudo: { type: 'richtext' },
        //             ano: { type: 'number' },
        //             uploadImagens: {
        //                 type: 'mixed',
        //                 isVisible: { list: false, show: false, filter: false, edit: true },
        //                 components: {
        //                     edit: Components.UploadMultiple
        //                 },
        //                 custom: { multiple: true }
        //             }
        //         },
        //         editProperties: ['titulo', 'ano', 'conteudo', 'uploadImagens'],
        //         showProperties: ['titulo', 'ano', 'conteudo']
        //     }
        // },
        {
            resource: models.Colaborador,
            options: {
                navigation: 'Equipe',
                properties: {
                    areaDeAtuacao: {
                        reference: 'areas',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                        label: 'Área de Atuação',
                    },
                    area_id: {
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
                ]
            },
            features: [
                createUploadFeature({
                    folder: 'colaboradores',
                    file: 'uploadImagem',
                    key: 'url_imagem',
                }),
            ],
            // features: [uploadImageFeature]
        },
        { resource: models.Oportunidade, options: { navigation: 'Oportunidades' } },
        { resource: models.Parceiro, options: { navigation: 'Parceiros' } },
        {
            resource: models.Transparencia,
            options: {
                navigation: 'Transparência',
                properties: {
                    area_id: {
                        reference: 'areas',
                        label: 'Área',
                        isVisible: { list: true, edit: true, filter: true, show: true },
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
                    areaDeAtuacao: {
                        reference: 'areas',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                        label: 'Área de Atuação',
                    },
                    area_id: {
                        isVisible: false, // Esconde o area_id bruto
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
                ]
            },
            features: [
                createUploadFeature({
                    folder: 'transparencia',
                    file: 'uploadImagem',
                    key: 'url_imagem',
                }),
            ],
            // features: [uploadImageFeature]

        },
        {
            resource: models.Programa,
            options: {
                navigation: 'Transparência',
                properties: {
                    area_id: {
                        reference: 'areas',
                        label: 'Área',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                    },
                },
            }
        },
        {
            resource: models.Publicacao,
            options: {
                navigation: 'Transparência',
                properties: {
                    area_id: {
                        reference: 'areas',
                        label: 'Área',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                    },
                },
            }
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
            // features: [uploadImageFeature]

        },
        { resource: models.PerguntaFrequente, options: { navigation: 'Configurações' } },
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

adminJs.watch()

export const adminRouter = AdminJSExpress.buildRouter(adminJs)