import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
  onAddFile,
} from '../../common/helpers';
import { history } from '../../core/router';
import { formValidation } from './upload-property.validations';
import {
  insertProperty,
  getSaleTypes,
  getEquipments,
  getProvinces,
  getPropertyList,
} from './upload-property.api';
import {
  onAddFeature,
  onRemoveFeature,
  onAddImage,
} from './upload-property.helpers';
import { setCheckboxList, setOptionList } from './upload-property.helpers';
import { mapPropertyFromViewModelToApi } from './upload-property.mappers';

let property = {
  id: '',
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  saleTypeIds: [],
  address: '',
  city: '',
  province: '',
  bathrooms: '',
  rooms: '',
  squareMeter: '',
  locationUrl: '',
  mainFeatures: [],
  equipmentIds: [],
  images: [],
};

onUpdateField('title', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    title: value,
  };
  formValidation.validateField('title', property.title).then((result) => {
    onSetError('title', result);
  });
});

onUpdateField('notes', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    notes: value,
  };
  formValidation.validateField('notes', property.notes).then((result) => {
    onSetError('notes', result);
  });
});

onUpdateField('email', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    email: value,
  };
  formValidation.validateField('email', property.email).then((result) => {
    onSetError('email', result);
  });
});

onUpdateField('phone', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    phone: value,
  };
  formValidation.validateField('phone', property.phone).then((result) => {
    onSetError('phone', result);
  });
});

onUpdateField('price', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    price: value,
  };
  formValidation.validateField('price', property.price).then((result) => {
    onSetError('price', result);
  });
});

onUpdateField('address', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    address: value,
  };
  formValidation.validateField('address', property.address).then((result) => {
    onSetError('address', result);
  });
});

onUpdateField('city', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    city: value,
  };
  formValidation.validateField('city', property.city).then((result) => {
    onSetError('city', result);
  });
});

onUpdateField('province', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    province: value,
  };
  formValidation.validateField('province', property.province).then((result) => {
    onSetError('province', result);
  });
});

onUpdateField('squareMeter', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    squareMeter: value,
  };
  formValidation
    .validateField('squareMeter', property.squareMeter)
    .then((result) => {
      onSetError('squareMeter', result);
    });
});

onUpdateField('rooms', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    rooms: value,
  };
  formValidation.validateField('rooms', property.rooms).then((result) => {
    onSetError('rooms', result);
  });
});

onUpdateField('bathrooms', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    bathrooms: value,
  };
  formValidation
    .validateField('bathrooms', property.bathrooms)
    .then((result) => {
      onSetError('bathrooms', result);
    });
});

onUpdateField('locationUrl', (event) => {
  const value = event.target.value;
  property = {
    ...property,
    locationUrl: value,
  };
  formValidation
    .validateField('locationUrl', property.locationUrl)
    .then((result) => {
      onSetError('locationUrl', result);
    });
});

onSubmitForm('insert-feature-button', () => {
  const value = document.getElementById('newFeature').value;
  if (value) {
    property.mainFeatures.push(value);
    property = {
      ...property,
      mainFeatures: property.mainFeatures,
    };
    onAddFeature(value);

    document.getElementById(`delete-${value}-button`).onclick = () => {
      onRemoveFeature(value);
      property = {
        ...property,
        mainFeatures: property.mainFeatures.filter(
          (feature) => feature !== value
        ),
      };
    };
  }
});

onAddFile('add-image', (image) => {
  if (!property.images.includes(image)) {
    property.images.push(image);
    onAddImage(image);
  }
});

onSubmitForm('save-button', () => {
  formValidation.validateForm(property).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      insertProperty(mapPropertyFromViewModelToApi(property)).then(() => {
        history.back();
      });
    }
  });
});

onUpdateField('saleTypes', (event) => {
  const value = event.target.value;
  property.saleTypeIds.includes(value)
    ? (property.saleTypeIds = property.saleTypeIds.filter(
        (type) => type !== value
      ))
    : property.saleTypeIds.push(value);

  formValidation
    .validateField('saleTypes', property.saleTypeIds)
    .then((result) => {
      onSetError('saleTypes', result);
    });
});

onUpdateField('equipments', (event) => {
  const value = event.target.value;
  property.equipmentIds.includes(value)
    ? (property.equipmentIds = property.equipmentIds.filter(
        (type) => type !== value
      ))
    : property.equipmentIds.push(value);
});

Promise.all([
  getSaleTypes(),
  getEquipments(),
  getProvinces(),
  getPropertyList(),
]).then(([saleTypeIds, equipmentIds, provinces, propertyList]) => {
  setCheckboxList(saleTypeIds, 'saleTypes');
  setCheckboxList(equipmentIds, 'equipments');
  setOptionList(provinces, 'province');

  /****** ME ASEGURO DE QUE DA IDS DE FORMA ORDENADA */
  let finalId = 1;
  const arrayIds = propertyList.map((property) => property.id);
  while (arrayIds.includes(finalId.toString())) {
    finalId++;
  }
  property = {
    ...property,
    id: finalId,
  };
});
