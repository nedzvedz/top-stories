'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopStories = function () {
  function TopStories(section) {
    _classCallCheck(this, TopStories);

    this.storage = new Map(); // Store for request results
    this.init(section);
  }

  _createClass(TopStories, [{
    key: 'generateUrl',
    value: function generateUrl(section) {
      return 'http://api.nytimes.com/svc/topstories/v1/' + section + '.json?api-key=75ae6a87552ef88bad7daa7a4bdb971b:2:74942476';
    }
  }, {
    key: 'checkStorage',
    value: function checkStorage(section) {
      /* check if we already have this articles in storage */
      if (this.storage.get(section)) {
        this.renderArticles(this.storage.get(section));
      } else {
        this.loadNewSection(section);
      }
    }
  }, {
    key: 'renderArticles',
    value: function renderArticles(results) {
      var $main = document.getElementById('main');
      var fragment = document.createDocumentFragment();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var article = _step.value;

          var articleImg = article.multimedia[0];
          var articleNode = document.createElement('article');

          /* in case if there is no media for article */
          if (!articleImg) {
            articleImg = {
              'url': 'http://placehold.it/75x75',
              'caption': 'No image for this article'
            };
          }

          articleNode.classList.add('article');
          articleNode.innerHTML = '<h3 class="article_title">\n          <a href="' + article.url + '">' + article.title + '</a>\n        </h3>\n        <img src="' + articleImg.url + '" class="article_image" alt="' + articleImg.caption + '" />\n        <p class="article_description">' + article.abstract + '</p>';
          fragment.appendChild(articleNode);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      $main.innerHTML = '';
      $main.appendChild(fragment);
    }
  }, {
    key: 'loadNewSection',
    value: function loadNewSection(section) {
      var _this = this;

      var $section = document.querySelector('.section');
      var $sectionTitle = document.querySelector('.section_title');

      $section.classList.add('loading');
      $sectionTitle.innerHTML = 'Section: ' + section;

      fetch(this.generateUrl(section)).then(function (response) {
        return response.json();
      }, function (error) {
        return console.log(error);
      }).then(function (data) {
        /* save results into the storage */
        _this.storage.set(data.section, data.results);

        /* render received results */
        _this.renderArticles(data.results);
        $section.classList.remove('loading');
      });
    }
  }, {
    key: 'init',
    value: function init(section) {
      var _this2 = this;

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
      var $menu = document.querySelector('.menu');
      $menu.addEventListener('click', function (e) {
        e.preventDefault();
        var $target = e.target;

        /* check if it's a menu link */
        if ($target.classList.contains('menu_link')) {
          var sectionTitle = $target.getAttribute('data-section');

          /* check if we already have this articles in storage */
          _this2.checkStorage(sectionTitle);
        }
      });

      /* Load Section */
      this.loadNewSection(section);
    }
  }]);

  return TopStories;
}();

var news = new TopStories('home');