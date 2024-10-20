
const moment = require('moment');

const name = {
  required: { message: 'O nome é obrigatório' },
  typeMatch: { message: 'O nome deve ser uma string' },
  length: { message: 'O nome deve ter entre 2 e 255 caracteres' },
};

const locate = {
  required: { message: 'O local é obrigatório' },
  typeMatch: { message: 'O local deve ser uma string' },
  length: { message: 'O local deve ter entre 5 e 255 caracteres' },
};

const date_and_time = {
  required: { message: 'A data e hora são obrigatórias' },
  typeMatch: { message: 'A data e hora devem ser uma string no formato ISO 8601' },
}; 

const description = {
  required: { message: 'O campo description é obrigatória' },
  typeMatch: { message: 'O campo description deve ser uma string' },
};

const egalitarian = {
  required: { message: 'O campo egalitarian é obrigatório' },
  typeMatch: { message: 'O campo egalitarian deve ser um booleano' },
};

export { name, locate, date_and_time, description, egalitarian };