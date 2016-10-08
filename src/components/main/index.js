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

  Main.prototype.create = function() {
    this.corpus.on('change', (function(_this) {
      return function() {
        return _this.analyzeCorpus();
      };
    })(this));
  };

  Main.prototype.analyzeCorpus = function() {
    console.log('analyze!');
    var corpus = this.corpus.getDeepCopy();

    var communal = {};
    var agentic = {};
    var words = corpus.split(' ');
    for (var i = 0, numWords = words.length; i < numWords; i++) {
      word = words[i].replace(',', '').replace('.', '');
      if (AGENTIC[word] === true) {
        agentic[word] || (agentic[word] = 0);
        agentic[word] += 1;
      } else if (COMMUNAL[word] === true) {
        communal[word] || (communal[word] = 0);
        communal[word] += 1;
      }
    }
    console.log(agentic);
    this.agenticAdjectives.set(Object.keys(agentic));
    this.communalAdjectives.set(Object.keys(communal));
  };

  return Main;
})();
