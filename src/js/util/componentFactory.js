"use strict";

var Article = require('../../components/article');
var Section = require('../../components/section');

class ComponentFactory {
  constructor() {}

  createComponent(options) {
    switch (options.componentType) {
      case "article":
        this.component = Article;
        break;
      case "section":
        this.component = Section;
        break;
    }

    return new this.component(options.data);
  }
}

module.exports = ComponentFactory;