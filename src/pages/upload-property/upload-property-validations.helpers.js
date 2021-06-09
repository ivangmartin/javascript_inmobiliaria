export const phoneValidator = (fieldValidatorArgs) => {
  const { value } = fieldValidatorArgs;
  const succeeded = /^(9|6)[0-9]{8}$/.test(value);
  return {
    succeeded,
    message: succeeded ? '' : 'Numero de teléfono no válido',
    type: 'PHONE_VALIDATOR',
  };
};

export const posValidator = (fieldValidatorArgs) => {
  const { value } = fieldValidatorArgs;
  const succeeded = value > 0;
  return {
    succeeded,
    message: succeeded ? '' : 'Numero positivo requerido',
    type: 'POSITIVO',
  };
};
