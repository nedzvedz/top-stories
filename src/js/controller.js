"use strict";

const mediatorService = require('./util/mediatorService');

class Controller {
  constructor() {
    this.mediator = mediatorService.getService();
    this.init();
  }


  setView(hash) {
    const route = hash.split('/')[1];
    const page = route || '';
    this.updatePage(page);
  }

  /**
   *  Renders all news for selected section
   */
  showSection(section) {
    this.mediator.publish('model:read', {key: section});
  }

  updatePage(page) {
    if (page == '') {
      this.showSection('home');
    } else {
      this.showSection(page);
    }
  }

  init() {
    this.mediator.subscribe('window:load', 'Controller', [this, this.setView]);
    this.mediator.subscribe('hash:change', 'Controller', [this, this.setView]);
  }
}
module.exports = Controller;