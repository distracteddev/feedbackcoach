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
    intellectual: true,
    independent: true,
    strong: true,
    active: true,
    adventurous: true,
    analyzing: true,
    athletic: true,
    autonomous: true,
    boastful: true,
    compentent: true,
    courageous: true,
    courage: true,
    decisive: true,
    determined: true,
    dominance: true,
    forceful: true,
    headstrong: true,
    hierarchal: true,
    impulsive: true,
    individual: true,
    individualistic: true,
    leader: true,
    leadership: true,
    logic: true,
    logical: true,
    masuline: true,
    objective: true,
    opinionated: true,
    opinioned: true,
    outspoken: true,
    persist: true,
    persistant: true,
    principled: true,
    superior: true,
    self-sufficient: true,
    self-confident: true,
    self-reliant: true
  };


  COMMUNAL = {
    loyal: true,
    yielding: true,
    yielded: true,
    loyalty: true,
    modest: true,
    modesty: true,
    nurture: true,
    nurtured: true,
    nurturing: true,
    pleasant: true,
    pleasantly: true,
    pleasure: true,
    polite: true,
    politely: true,
    quiet: true,
    quietly: true,
    responsive: true,
    responsible: true,
    emotional: true,
    emotions: true,
    empathy: true,
    empathetic: true,
    feminine: true,
    gentle: true,
    gently: true,
    honest: true,
    honesty: true,
    honestly: true,
    personable: true,
    interpersonal: true,
    interdependent: true,
    sweet: true,
    sweetest: true,
    sweetly: true,
    affection: true,
    affectionate: true,
    cheerful: true,
    cheer: true,
    committed: true,
    commune: true,
    communal: true,
    compassion: true,
    compassionate: true,
    connective: true,
    considerate: true,
    cooperate: true,
    cooperative: true,
    helpful: true,
    helps: true,
    helping: true,
    kind: true,
    kindness: true,
    sympathetic: true,
    sympathy: true,
    sensitive: true,
    cared: true,
    nuturing: true,
    agreeable: true,
    caring: true,
    collaborate: true,
    collaborative: true,
    inclusive: true
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
