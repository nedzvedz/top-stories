'use strict';

class TopStories {
  constructor() {

    this.storage = new Map(); // Store all requests here
    this.init();
  }

  renderArticles(data) {
    let articles = data.results,
      $main = document.getElementById('main'),
      fragment = document.createDocumentFragment();
    for (let article of articles) {
      let articleImg = article.multimedia[0];

      /* in case if there is no media for article */
      if (!articleImg) {
        articleImg = {
          'url': '',
          'caption': 'No image for this article'
        }
      }
      let articleNode = document.createElement('article');
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

  loadNewSection(title, url) {
    let $section = document.querySelector('.section'),
      $sectionTitle = document.querySelector('.section_title');
    $section.classList.add('loading');
    $sectionTitle.innerHTML = `Section: ${title}`;

    fetch(url)
      .then(response => response.json(), error => console.log(error))
      .then(data => {
        this.renderArticles(data);
        $section.classList.remove('loading');

      });
  }

  init() {
    let homeUrl = 'http://api.nytimes.com/svc/topstories/v1/home.json?api-key=75ae6a87552ef88bad7daa7a4bdb971b:2:74942476';

    /* Add listener for links */
    let menu = document.querySelector('.menu');
    menu.addEventListener('click', e => {
      e.preventDefault();
      let $target = e.target;
      if ($target.classList.contains('menu_link')) {
        let sectionTitle = $target.dataset.section,
          url = `http://api.nytimes.com/svc/topstories/v1/${sectionTitle}.json?api-key=75ae6a87552ef88bad7daa7a4bdb971b:2:74942476`;
        this.loadNewSection(sectionTitle, url);
      }
    });

    /* Load Home Section */
    this.loadNewSection('home', homeUrl);
  };
}

let news = new TopStories();