"use strict";

var Article = require('../components/article');
var Section = require('../components/section');

class Template {
  constructor() {
  }
  showAll(data) {
    let fragment = document.createDocumentFragment();
    for (let section of data) {
      let newSection = new Section(section);
      let sectionContent = newSection.elem.querySelector('.section_content');

      for (let article of section.results) {
        let newArticle = new Article(article);
        sectionContent.appendChild(newArticle.elem);
      }
      fragment.appendChild(newSection.elem);
    }
    return fragment;
  }

  showSection(data) {
    let fragment = document.createDocumentFragment();
    let newSection = new Section(data);
    let sectionContent = newSection.elem.querySelector('.section_content');

    newSection.elem.classList.add('section--listing');

    for (let article of data.results) {
      let newArticle = new Article(article);
      sectionContent.appendChild(newArticle.elem);
    }
    fragment.appendChild(newSection.elem);

    return fragment;
  }
}

module.exports = Template;