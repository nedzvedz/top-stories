"use strict";

class View {
  constructor(template) {
    this.template = template;

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
  }

  render(viewCmd, parameter) {
    this.viewCommands[viewCmd](parameter);
  }
  startLoading() {
    this.$app.classList.add('loading');
  }
  stopLoading() {
    this.$app.classList.remove('loading');
  }
}

module.exports = View;