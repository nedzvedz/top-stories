"use strict";

import template from './section.jade';

class Section {
  constructor(data) {
    this.elem = document.createElement('section');
    this.elem.classList.add('section');
    this.elem.innerHTML = template(data);
  }
}

module.exports = Section;