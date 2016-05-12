"use strict";

class Mediator {
  constructor() {
    this.channels = [];
  }

  subscribe(channel, id, arr) {
    if (!this.channels[channel]) {
      this.channels[channel] = [];
    }
    return this.channels[channel].push({
      'id': id,
      'context': arr[0],
      'callback': arr[1]
    })
  }

  unsubscribe(channel, id) {
    if (!this.channels[channel]) {
      return false;
    }
    let i = 0;
    let len = this.channels[channel].length;
    for (i; i < len; i++) {
      if (this.channels[channel][i].id === id) {
        let removed = this.channels[channel].splice(i, 1);
        return (removed.length > 0);
      }
    }
    return false;
  }

  publish(channel, data) {
    if (!this.channels[channel]) {
      return;
    }
    let subscribers = this.channels[channel].slice();
    subscribers.forEach(function (sub) {
      sub.callback.call(sub.context, data);
    })
  }

}

const MediatorService = (function () {
  let service;

  const createService = function () {
    return new Mediator;
  };

  return {
    getService: function() {
      if (!service) {
        service = createService();
      }

      return service;
    }
  }
})();

module.exports = MediatorService;