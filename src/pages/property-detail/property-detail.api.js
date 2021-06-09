import Axios from 'axios';

const equipmentUrl = `${process.env.BASE_API_URL}/equipments`;
const propertyUrl = `${process.env.BASE_API_URL}/properties?id=`;
const contactUrl = `${process.env.BASE_API_URL}/contact`;

export const getEquipment = () =>
  Axios.get(equipmentUrl).then((response) => {
    return response.data;
  });

export const getProperty = (id) =>
  Axios.get(`${propertyUrl}${id}`).then((response) => {
    return response.data[0];
  });

export const insertContact = (form) =>
  Axios.post(`${contactUrl}/${form.id}`, form).then((response) => {
    return response.data;
  });
