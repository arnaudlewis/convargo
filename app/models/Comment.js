'use strict';

export let Comment = class {

  constructor (id, comment, websiteId) {
    this._id = id
    this.comment = comment
    this.websiteId = websiteId
  }

  toJson () {
    return {
      "_id": this._id,
      "comment": this.comment,
      "websiteId": this.websiteId,
    }
  }
}
