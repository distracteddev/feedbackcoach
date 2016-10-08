var AGENTIC, COMMUNAL, Main;

AGENTIC = {
    daring: true,
    bold: true,
    confident: true,
    assertive: true,
    aggressive: true,
    ambitious: true,
    dominant: true,
    forceful: true,
    intellectual: true
  };

  COMMUNAL = {
    affectionate: true,
    helpful: true,
    kind: true,
    sympathetic: true,
    sensitive: true,
    nuturing: true,
    agreeable: true,
    caring: true,
    collaborative: true
  };

module.exports = Main = (function() {
  function Main() {}

  Main.prototype.view = __dirname;

  Main.prototype.init = function() {
    this.corpus = this.model.at('corpus');
    this.agenticAdjectives = this.model.at('agenticAdjectives');
    this.communalAdjectives = this.model.at('communalAdjectives');
  };

  Main.prototype.clicked = function(e) {
    console.log('clicked');
    console.log(e);
  };

  Main.prototype.analyzeCorpus = function() {
    var agenticCount, agentic, communalCount, communal, corpus, word, _i, _len, _ref;
    corpus = this.corpus.get();
    if (!corpus) {
      return;
    }
    communal = {};
    agentic = {};
    agenticCount = 0;
    communalCount = 0;
    _ref = corpus.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      word = _ref[_i];
      if (AGENTIC[word] === true) {
        agentic[word] || (agentic[word] = 0);
        agentic[word] += 1;
        agenticCount++;
      } else if (COMMUNAL[word] === true) {
        communal[word] || (communal[word] = 0);
        communal[word] += 1;
        communalCount++;
      }
    }
    this.agenticAdjectives.set(Object.keys(agentic));
    this.communalAdjectives.set(Object.keys(communal));
    return this.score.set(communalCount - agenticCount);
  };

  return Main;
})();
