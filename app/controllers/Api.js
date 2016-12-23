import isUrl from 'is-url';
import request from 'request';

import {Website} from '../models/Website';
import {Comment} from '../models/Comment';
import WebsiteRepo from '../models/WebsiteRepo';
import CommentRepo from '../models/CommentRepo';

function getWebsiteTitle(url) {
  return new Promise((resolve, reject) => {
    if (!isUrl(url)) {
      reject('Invalid URL')
    }
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const titleRegexp = new RegExp('<title[^>]*>(.*?)</title>');
        const matches = body.match(titleRegexp);
        resolve(matches ? matches[1] : null);
      } else {
        reject('Cannot retrieved content')
      }
    })
  })
}

function createWebsite(url) {
  return getWebsiteTitle(url)
  .then(title => new Website(null, url, title))
  .then(website => WebsiteRepo.insert(website))
  .catch(e => {
    console.error(e)
    throw new Error(`Fail to create website - ${e}`)
  });
}

function getAllWebsites() {
  return WebsiteRepo.getAll()
  .catch(e => {
    console.error(e)
    throw new Error(`Fail to fetch websites`)
  });
}

function voteWebsite(websiteId, incr) {
  return WebsiteRepo.updateVotes(websiteId, incr)
  .catch(e => {
    console.error(e)
    throw new Error(`Fail to upvote website ${websiteId}`)
  });
}

function createComment(websiteId, commentText) {
  const comment = new Comment(null, commentText, websiteId);
  return CommentRepo.insert(comment)
  .catch(e => {
    console.error(e)
    throw new Error(`Fail to create website from ${websiteURL}`)
  });
}

function getAllComments(websiteId) {
  return CommentRepo.getAllByWebsiteId(websiteId)
  .catch(e => {
    console.error(e)
    throw new Error(`Fail to fetch comments of website ${websiteId}`)
  })
}

export default { createWebsite, getAllWebsites, voteWebsite, createComment, getAllComments };
