'use strict';

const mediatorService = require('./util/mediatorService');

class Model {
  constructor() {
    this.mediator = mediatorService.getService();
    this.sections = ['home', 'world', 'national', 'politics', 'nyregion', 'business', 'opinion', 'technology',
      'health', 'sports', 'arts', 'fashion', 'dining', 'travel', 'magazine', 'realestate'];
    this.storage = new Map();
    this.init();
  }

  read(query, cb) {
    if (query.key === 'all') {
      let data = [];
      let urls = this.sections.map(this._generateUrl);
      Promise.all(urls.map(this._fetchWrap))
        .then(res => {
          for (let section of res) {
            this.storage.set(section.section, section.results);
            let firstTwoArtciles = section.results.slice(0, 2);
            data.push({name: section.section, results: firstTwoArtciles});
          }
          this.mediator.publish('view:update', {'cmd': 'showAll', 'param': data});
        }, err => {
          console.log('Something goes wrong: ' + err.message);
        });
    } else {
      this._getData(query.key).then(res => {
          let data = {
            name: query.key,
            results: res
          };
          this.mediator.publish('view:update', {'cmd': 'showSection', 'param': data});
        }
      );
    }
  }

  _generateUrl(section) {
    return `http://api.nytimes.com/svc/topstories/v1/${section}.json?api-key=75ae6a87552ef88bad7daa7a4bdb971b:2:74942476`;
  }

  _fetchWrap(url) {
    return fetch(url).then(res => res.json());
  }

  _getData(section, itemsNumber) {
    if (this.storage.has(section)) {
      return new Promise((resolve, reject) => {
        let data = this.storage.get(section);
        if (!itemsNumber) {
          resolve(data);
        } else {
          let res = data.slice(0, itemsNumber);
          resolve(res);
        }
      });
    } else {
      return fetch(this._generateUrl(section))
        .then(response => response.json(), error => console.log(error))
        .then(data => {
          this.storage.set(data.section, data.results);
          if (!itemsNumber) {
            return (data.results);
          } else {
            let res = data.results.slice(0, itemsNumber);
            return (res);
          }
        })
    }
  }

  init() {
    this.mediator.subscribe('model:read', 'Model', [this, this.read]);
  }
}

module.exports = Model;
