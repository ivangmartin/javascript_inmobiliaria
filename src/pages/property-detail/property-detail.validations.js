import { Validators, createFormValidation } from '@lemoncode/fonk';

Validators.required.setErrorMessage('Campo requerido');

const validationSchema = {
  field: {
    email: [
      {
        validator: Validators.required,
      },
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
    message: [
      {
        validator: Validators.required,
      },
    ],
  },
};
export const formValidation = createFormValidation(validationSchema);
