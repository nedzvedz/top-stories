"use strict";

const mediatorService = require('./util/mediatorService');

class View {
  constructor(template) {
    this.template = template;
    this.mediator = mediatorService.getService();

    this.$main = document.getElementById('main');
    this.$app = document.querySelector('.app');

    this.viewCommands = {
      showAll: parameter => {
        this.$main.innerHTML = '';
        this.$main.appendChild(this.template.showAll(parameter));
        this.stopLoading();
      },
      showSection: parameter => {
        this.$main.innerHTML = '';
        this.$main.appendChild(this.template.showSection(parameter));
        this.stopLoading();
      }
    };

    this.init();
  }

  render(obj) {
    this.viewCommands[obj.cmd](obj.param);
  }
  startLoading() {
    this.$app.classList.add('loading');
  }
  stopLoading() {
    this.$app.classList.remove('loading');
  }

  init() {
    this.mediator.subscribe('view:update', 'View', [this, this.render]);
    this.mediator.subscribe('view:loading', 'View', [this, this.startLoading]);
  }
}

module.exports = View;