'use strict';

class DataFactory {
  constructor() {
    this.storage = new Map();
  }

  generateUrl(section) {
    return `http://api.nytimes.com/svc/topstories/v1/${section}.json?api-key=75ae6a87552ef88bad7daa7a4bdb971b:2:74942476`;
  }

  getData(key) {
    if (this.storage.has(key)) {
      return new Promise((resolve, reject) => {
        resolve(this.storage.get(key));
      });
    } else {
      return fetch(this.generateUrl(key))
        .then(response => response.json(), error => console.log(error))
        .then(data => {
          this.storage.set(data.section, data.results);
          return data.results;
        })
    }
  }
}

module.exports = DataFactory;
