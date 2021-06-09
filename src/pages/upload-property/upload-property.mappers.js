export const mapPropertyFromViewModelToApi = (property) => {
  return {
    ...property,
    id: property.id.toString(),
    price: parseInt(property.price),
    rooms: parseInt(property.rooms),
    bathrooms: parseInt(property.bathrooms),
    squareMeter: parseInt(property.squareMeter),
  };
};
