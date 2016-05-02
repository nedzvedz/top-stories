"use strict";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  setView(hash) {
    const route = hash.split('/')[1];
    const page = route || '';
    this._updatePage(page);
  }

  /**
   * Event fires on load. Gets all items & displays them
   */
  showAll() {
    this.view.startLoading();
    this.model.read({key: 'all'}, data => {
      this.view.render('showAll', data);
    });
  }

  /**
   *  Renders all news for selected section
   */
  showSection(section) {
    this.model.read({key: section}, data => this.view.render('showSection', data));
  }

  _updatePage(page) {
    if (page == '') {
      this.showAll();
    } else {
      this.showSection(page);
    }
  }

}
module.exports = Controller;