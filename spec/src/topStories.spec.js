let TopStories = require('../../src/js/topStories');

describe('TopStories application', function () {
  let topStories;
  beforeEach(() => {
    topStories = new TopStories();
  });

  it('Should initialize application properly', function () {
    expect(topStories.template).toBeDefined();
    expect(topStories.mediator).toBeDefined();
    expect(topStories.model).toBeDefined();
    expect(topStories.view).toBeDefined();
    expect(topStories.controller).toBeDefined();
  });
});