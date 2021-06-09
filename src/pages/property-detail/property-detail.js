import { setPropertyValues } from './property-detail.helpers';
import {
  getEquipment,
  getProperty,
  insertContact,
} from './property-detail.api';
import { history } from '../../core/router';
import { mapPropertyFromApiToViewModel } from './property-detail.mappers';
import { formValidation } from './property-detail.validations';
import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';

const params = history.getParams();
const hasArgument = Boolean(params.id);

if (hasArgument) {
  Promise.all([getProperty(params.id), getEquipment()]).then(
    ([apiProperty, allEquipments]) => {
      let property = mapPropertyFromApiToViewModel(apiProperty);
      property.equipments = property.equipments.map((equipment) => {
        return allEquipments
          .filter((allEquipment) => allEquipment.id === equipment)
          .map((allEquipment) => allEquipment.name)[0];
      });
      setPropertyValues(property);
    }
  );

  let form = {
    id: '',
    property: params.id,
    email: '',
    message: '',
  };

  onUpdateField('email', (event) => {
    const value = event.target.value;
    form = {
      ...form,
      email: value,
    };

    formValidation.validateField('email', form.email).then((result) => {
      onSetError('email', result);
    });
  });

  onUpdateField('message', (event) => {
    const value = event.target.value;
    form = {
      ...form,
      message: value,
    };

    formValidation.validateField('message', form.message).then((result) => {
      onSetError('message', result);
    });
  });

  onSubmitForm('contact-button', () => {
    formValidation.validateForm(form).then((result) => {
      onSetFormErrors(result);
      if (result.succeeded) {
        insertContact(form);
        history.back();
      }
    });
  });
} else {
  history.back();
}
