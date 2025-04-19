import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/sequelize'
import { initializeModels } from '../models/index.js'
import { sequelize } from './database.js'

AdminJS.registerAdapter({ Database, Resource })

const models = initializeModels(sequelize)

export const adminJs = new AdminJS({
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
                    area_id: {
                        reference: 'areas',
                        label: 'Área',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                    },
                },
            }
        },
        { resource: models.LinhaDoTempo, options: { navigation: 'Conteúdo' } },
        {
            resource: models.Colaborador,
            options: {
                navigation: 'Equipe',
                properties: {
                    area_id: {
                        reference: 'areas',
                        label: 'Área de Atuação',
                        isVisible: { list: true, edit: true, filter: true, show: true },
                    },
                },
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
});
