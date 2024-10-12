const password = {
  required: { message: 'A senha é obrigatória' },
  regex: {
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  },
  matchRegex: {
    message:
      'A senha deve ter no mínimo 6 caracteres, contendo letras e números',
  },
};

const name = {
  required: { message: 'O nome é obrigatório' }
}

const email = {
  required: { message: 'O e-mail é obrigatório' },
  matchRegex: { message: 'Forneça um e-mail válido' }
}
const phone = {
  required:{ message: 'O número de telefone é obrigatório' },
  matchRegex: { message: 'O número de telefone deve ser válido em formato internacional' },
  format: ({value}) => value.replace(/\s+/g, '')
}

export { password, name , email, phone};
