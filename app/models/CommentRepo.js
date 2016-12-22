import { getCollection } from '../data/db'
import mongojs, { ObjectId } from 'mongojs'
import { Comment } from './Comment'

const collection = getCollection('comments')

const buildComment = (mongoComment) => {
  return new Comment (
    mongoComment._id,
    mongoComment.comment,
    mongoComment.websiteId,
  )
}

export default {

  insert(comment) {
    return new Promise((resolve, reject) => {
      collection.insert(comment.toJson(), (err) => {
        if(err) reject(err.message)
        resolve()
      })
    })
  },

  getAllByWebsiteId(websiteId) {
    const query = {"websiteId" : websiteId.toString()}
    return new Promise((resolve, reject) => {
      collection.find(query).toArray((err, comments) => {
        if(err) reject(err.message)
        else resolve(comments.map(buildComment))
      })
    })
  },
}
