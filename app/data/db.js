import mongojs from 'mongojs'

const db = mongojs('convargo')

export let getCollection = (collectionName) => {
  return db.collection(collectionName)
}
