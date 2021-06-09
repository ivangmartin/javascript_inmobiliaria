import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { isUrl } from '@lemoncode/fonk-is-url-validator';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';
import {
  phoneValidator,
  posValidator,
} from './upload-property-validations.helpers';

Validators.required.setErrorMessage('Campo requerido');

const validationSchema = {
  field: {
    title: [
      {
        validator: Validators.required,
      },
    ],
    notes: [
      {
        validator: Validators.required,
      },
    ],
    email: [
      {
        validator: Validators.required,
      },
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
    phone: [
      {
        validator: Validators.required,
      },
      {
        validator: phoneValidator,
      },
    ],
    price: [
      {
        validator: posValidator,
      },
    ],
    address: [
      {
        validator: Validators.required,
      },
    ],
    city: [
      {
        validator: Validators.required,
      },
    ],
    province: [
      {
        validator: Validators.required,
      },
    ],
    squareMeter: [
      {
        validator: posValidator,
      },
    ],
    rooms: [
      {
        validator: posValidator,
      },
    ],
    bathrooms: [
      {
        validator: posValidator,
      },
    ],
    locationUrl: [
      {
        validator: Validators.required,
      },
      {
        validator: isUrl.validator,
        message: 'Url incorrecta',
      },
    ],
    saleTypes: [
      {
        validator: arrayRequired,
        message: 'Alguna opción obligatoria',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
