import mongojs from 'mongojs';

const db = mongojs('convargo');

export const getCollection = collectionName => db.collection(collectionName);
