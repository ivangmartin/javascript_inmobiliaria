export const mapPropertyFromApiToViewModel = (property) => {
  return {
    ...property,
    rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
    bathrooms: `${property.bathrooms} ${getBathroomWord(property.bathrooms)}`,
    squareMeter: `${property.squareMeter}m2`,
    price: `${property.price} €`,
    mainImage: Array.isArray(property.images) ? property.images[0] : '',
    equipments: property.equipmentIds,
  };
};

const getRoomWord = (rooms) => {
  return rooms > 1 ? 'habitaciones' : 'habitación';
};

const getBathroomWord = (bathrooms) => {
  return bathrooms > 1 ? 'baños' : 'baño';
};
