import { Area } from './area.js';
import { Categoria } from './categoria.js';
import { Colaborador } from './colaborador.js';
import { DadosBancario } from './dados_bancarios.js';
import { LinhaDoTempo } from './linha_do_tempo.js';
import { LinhaDoTempoImagem } from './linha_do_tempo_imagens.js';
import { Noticia } from './noticia.js';
import { Oportunidade } from './oportunidade.js';
import { Parceiro } from './parceiro.js';
import { PerguntaFrequente } from './pergunta_frequente.js';
import { Programa } from './programa.js';
import { Publicacao } from './publicacao.js';
import { Transparencia } from './transparencia.js';

export function initializeModels(sequelize) {
  const models = {
    Area: Area.init(sequelize),
    Categoria: Categoria.init(sequelize),
    Colaborador: Colaborador.init(sequelize),
    DadosBancario: DadosBancario.init(sequelize),
    LinhaDoTempo: LinhaDoTempo.init(sequelize),
    Noticia: Noticia.init(sequelize),
    Oportunidade: Oportunidade.init(sequelize),
    Parceiro: Parceiro.init(sequelize),
    PerguntaFrequente: PerguntaFrequente.init(sequelize),
    Programa: Programa.init(sequelize),
    Publicacao: Publicacao.init(sequelize),
    Transparencia: Transparencia.init(sequelize),
    LinhaDoTempoImagem: LinhaDoTempoImagem.init(sequelize),
  };

  Object.values(models).forEach(model => {
    if (model.associate) {
      model.associate(models);
    }
  });

  return models;
}
