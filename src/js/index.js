"use strict";

const TopStories = require('./topStories');

let news = new TopStories();

window.addEventListener('load', function () {
  news.mediator.publish('window:load', document.location.hash);
});
window.addEventListener('hashchange', function () {
  news.mediator.publish('hash:change', document.location.hash);
});