import { getCollection } from '../data/db'
import { ObjectId } from 'mongojs'
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

  find(id) {
    return new Promise((resolve, reject) => {
      const query = {_id: ObjectId(id)}
      collection.findOne(query, (err, website) => {
        if(err) reject(err)
        resolve(buildWebsite(website))
      })
    })
  },

  insert(website) {
    return new Promise((resolve, reject) => {
      collection.insert(website.toJson(), err => {
        if(err) reject(err.message)
        resolve(website)
      })
    })
  },

  updateVotes(websiteId, incr) {
    return new Promise((resolve, reject) => {
      const query = { _id: ObjectId(websiteId) };
      const modifier = { $inc: { votes: incr } };
      db.products.update(query, modifier, err => {
        if(err) reject(err.message)
        this.find(websiteId).then(w => resolve(w))
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
