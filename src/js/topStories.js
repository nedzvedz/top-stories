'use strict';

import DataFactory from './dataFactory';

class TopStories {
  constructor(section) {
    this.dataFactory = new DataFactory();
    console.log(this.dataFactory);
    this.init(section);
  }

  renderArticles(results) {
    let $main = document.getElementById('main');
    let fragment = document.createDocumentFragment();

    for (let article of results) {
      let articleImg = article.multimedia[0];
      let articleNode = document.createElement('article');

      /* in case if there is no media for article */
      if (!articleImg) {
        articleImg = {
          'url': 'http://placehold.it/75x75',
          'caption': 'No image for this article'
        }
      }

      articleNode.classList.add('article');
      articleNode.innerHTML =
        `<h3 class="article_title">
          <a href="${article.url}">${article.title}</a>
        </h3>
        <img src="${articleImg.url}" class="article_image" alt="${articleImg.caption}" />
        <p class="article_description">${article.abstract}</p>`;
      fragment.appendChild(articleNode);
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
        console.log(data);
        /* render received results */
        this.renderArticles(data);
        $section.classList.remove('loading');

      });
  }

  init(section) {
    /**
     * Proxies are commented since Babel can not transpile them due to ES5 limitations
     */
    /*this.proxyLoadSection = new Proxy(this.loadNewSection,
      {
        apply: (target, thisArg, argumentsList) => {
          console.log(`Loading ${argumentsList[0]} section`);
          return target.apply(thisArg, argumentsList);
        }
      }
    );
    this.proxyRenderArticles = new Proxy(this.renderArticles,
      {
        apply: (target, thisArg, argumentsList) => {
          console.log(`Rendering ${argumentsList[0].length} articles`);
          return target.apply(thisArg, argumentsList);
        }
      }
    );
    this.proxyCheckStorage = new Proxy(this.checkStorage,
      {
        apply: (target, thisArg, argumentsList) => {
          let section = argumentsList[0];
          if (this.storage.get(section)) {
            console.log(`Rendering ${section} articles from the storage`);
          }
          return target.apply(thisArg, argumentsList);
        }
      });*/

    /* Add listener for links */
    let $menu = document.querySelector('.menu');
    $menu.addEventListener('click', e => {
      e.preventDefault();
      let $target = e.target;

      /* check if it's a menu link */
      if ($target.classList.contains('menu_link')) {
        let sectionTitle = $target.getAttribute('data-section');

        this.loadNewSection(sectionTitle);

      }
    });

    /* Load Section */
    this.loadNewSection(section);
  };
}

let news = new TopStories('home');
