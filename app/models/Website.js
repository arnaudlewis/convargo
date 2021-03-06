

export const Website = class {

  constructor(id, url, title, votes) {
    this._id = id;
    this.url = url;
    this.title = title || url;
    this.votes = votes || 0;
  }

  toJson() {
    return {
      _id: this._id,
      url: this.url,
      title: this.title,
      votes: this.votes,
    };
  }
};
