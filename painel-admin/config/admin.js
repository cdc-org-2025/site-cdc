import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/sequelize'
import { initializeModels } from '../models/index.js'
import { sequelize } from './database.js'
import { Components, componentLoader } from '../src/components.js'


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
        { resource: models.LinhaDoTempo, options: { navigation: 'Conteúdo' } },
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
                        isVisible: false, // Esconde o area_id bruto
                    },
                },
                editProperties: ['nome', 'cargo', 'email', 'areaDeAtuacao', 'url_imagem'],
                showProperties: ['nome', 'cargo', 'email', 'areaDeAtuacao', 'url_imagem'],
            }
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
                },
            }
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
        { resource: models.DadosBancario, options: { navigation: 'Configurações' } },
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
    componentLoader
});

adminJs.watch()

export const adminRouter = AdminJSExpress.buildRouter(adminJs)