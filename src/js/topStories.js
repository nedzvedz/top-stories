'use strict';

require('../scss/style.scss');

class TopStories {
  constructor(section) {
    this.init(section);
  }

  renderArticles(results) {
    let $main = document.getElementById('main');
    let fragment = document.createDocumentFragment();

    for (let article of results) {
      let newArticle = new this.Article(article);
      fragment.appendChild(newArticle.elem);
    }

    $main.innerHTML = '';
    $main.appendChild(fragment);
  }

  loadNewSection(section) {
    let $section = document.querySelector('.section');
    let $sectionTitle = document.querySelector('.section_title');

    $section.classList.add('loading');
    $sectionTitle.innerHTML = `Section: ${section}`;

    this.dataFactory.getData(section)
      .then(data => {
        /* render received results */
        this.renderArticles(data);
        $section.classList.remove('loading');

      });
  }

  init(section) {
    /* Add listener for links */
    let $menu = document.querySelector('.menu');
    $menu.addEventListener('click', e => {
      e.preventDefault();
      let $target = e.target;

      /* check if it's a menu link */
      if ($target.classList.contains('menu_link')) {
        let sectionTitle = $target.getAttribute('data-section');

        require.ensure(['./dataFactory', '../components/article'], (require) => {

          const DataFactory = require('./dataFactory');
          this.Article = require('../components/article');

          this.dataFactory = new DataFactory();

          this.loadNewSection(sectionTitle);
          $loadNewsBtn.remove();
        });

      }
    });

    let $loadNewsBtn = document.getElementById('loadNews');
    $loadNewsBtn.addEventListener('click', e => {
      e.preventDefault();
      require.ensure(['./dataFactory', '../components/article'], (require) => {

        const DataFactory = require('./dataFactory');
        this.Article = require('../components/article');

        this.dataFactory = new DataFactory();

        this.loadNewSection(section);
        $loadNewsBtn.remove();
      });
    });
  };
}

let news = new TopStories('home');
