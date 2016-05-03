'use strict';

const Model = require('./model');
const View = require('./view');
const Controller = require('./controller');
const Template = require('./util/template');
const mediatorService = require('./util/mediatorService');

require('../scss/style.scss');

class TopStories {
  constructor() {
    this.template = new Template();
    this.mediator = mediatorService.getService();
    this.model = new Model();
    this.view = new View(this.template);
    this.controller = new Controller();
  }
}

let news = new TopStories();

window.addEventListener('load', function () {
  news.mediator.publish('window:load', document.location.hash);
});
window.addEventListener('hashchange', function () {
  news.mediator.publish('hash:change', document.location.hash);
});