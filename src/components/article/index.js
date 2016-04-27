"use strict";

import './article.scss';

import template from './menu.jade';

class Article {
  constructor(data) {
    this.elem = document.createElement('article');
    this.elem.classList.add('article');
    this.elem.innerHTML = template(data);
  }
}

module.exports = Article;