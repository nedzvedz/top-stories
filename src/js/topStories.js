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


module.exports = TopStories;