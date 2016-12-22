import { getCollection } from '../data/db'
import mongojs from 'mongojs'
import { Website } from './Website'

const collection = getCollection('websites')

const buildWebsite = (mongoWebsite) => {
  return new Website (
    mongoWebsite._id,
    mongoWebsite.url,
    mongoWebsite.title,
    mongoWebsite.votes,
  )
}

export default {

  insert(website) {
    return new Promise((resolve, reject) => {
      collection.insert(website.toJson(), (err) => {
        if(err) reject(err.message)
        resolve()
      })
    })
  },

  getAll() {
    return new Promise((resolve, reject) => {
      collection.find().toArray((err, websites) => {
        if(err) reject(err.message)
        else resolve(websites.map(buildWebsite))
      })
    })
  },

  // upvote(id) {
  //   return new Promise ((resolve, reject) => {
  //     const query = {_id: mongojs.ObjectId(id)}
  //     collection.update(query, (err, trip) => {
  //       if(err) reject(err)
  //       resolve(buildTrip(trip))
  //     })
  //   })
  // },

  // downVote(id) {
  //   return new Promise ((resolve, reject) => {
  //     const query = {_id: mongojs.ObjectId(id)}
  //     collection.update(query, (err, trip) => {
  //       if(err) reject(err)
  //       resolve(buildTrip(trip))
  //     })
  //   })
  // }

}
