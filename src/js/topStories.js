'use strict';

const Model = require('./model');
const View = require('./view');
const Controller = require('./controller');
const Template = require('./template');

require('../scss/style.scss');

class TopStories {
  constructor() {
    this.template = new Template();
    this.model = new Model();
    this.view = new View(this.template);
    this.controller = new Controller(this.model, this.view);
  }
}

let news = new TopStories();

window.addEventListener('load', function () {
  news.controller.setView(document.location.hash);
});
window.addEventListener('hashchange', function () {
  news.controller.setView(document.location.hash);
});