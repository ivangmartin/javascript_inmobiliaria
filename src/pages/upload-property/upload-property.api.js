import Axios from 'axios';

const saleTypestUrl = `${process.env.BASE_API_URL}/saleTypes`;
const equipmentstUrl = `${process.env.BASE_API_URL}/equipments`;
const provincestUrl = `${process.env.BASE_API_URL}/provinces`;
const propertytUrl = `${process.env.BASE_API_URL}/properties`;

export const getSaleTypes = () =>
  Axios.get(saleTypestUrl).then((response) => {
    return response.data;
  });

export const getEquipments = () =>
  Axios.get(equipmentstUrl).then((response) => {
    return response.data;
  });

export const getProvinces = () =>
  Axios.get(provincestUrl).then((response) => {
    return response.data;
  });

export const getPropertyList = () =>
  Axios.get(propertytUrl).then((response) => {
    return response.data;
  });

export const insertProperty = (property) =>
  Axios.post(`${propertytUrl}/${property.id}`, property).then((response) => {
    return response.data;
  });
