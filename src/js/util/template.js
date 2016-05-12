"use strict";

const ComponentFactory = require('./componentFactory');
const componentFactory = new ComponentFactory;

class Template {
  constructor() {
  }

  showSection(data) {
    let fragment = document.createDocumentFragment();
    let newSection = componentFactory.createComponent({'componentType': 'section', 'data': data});
    let sectionContent = newSection.elem.querySelector('.section_content');

    newSection.elem.classList.add('section--listing');

    for (let article of data.results) {
      let newArticle = componentFactory.createComponent({'componentType': 'article', 'data': article});
      sectionContent.appendChild(newArticle.elem);
    }
    fragment.appendChild(newSection.elem);

    return fragment;
  }
}

module.exports = Template;