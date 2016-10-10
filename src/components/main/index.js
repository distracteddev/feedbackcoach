var request = require('superagent');
var toneSample = require('./sample');
var AGENTIC, COMMUNAL, Main;
var USE_SAMPLE = true;

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
    superior: true
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
    this.corpus.set('*  Definitely an executor - focuses on details - stories she told focused on execution\n* Organized (e.g. always on top of my tickets and my emails, coming in early to check the conference rooms)\n* Gets things done - self-described working style as "hard-working, will follow through"\n\nAreas of growth:\n* Speaking up - active communication - something she is aware she needs to work on -- received feedback from co-worker and manager to speak up more in meetings and to collaborate more - she talked about her goal to "learning to collaborate more and communicate better" -- but couldn\'t give any good examples >.<\n* Seeing more the big picture - definitely strength is focusing on details, which means will need to work on remembering to tie it in to the big picture. Also comes out when talking about problems, talks to the very tangible things.')
  };
  Main.prototype.toggleDetails = function(detailPath) {
    this.model.set(detailPath, !this.model.get(detailPath))
  }
  Main.prototype.create = function() {
    this.corpus.on('change', (function(_this) {
      return function() {
        return _this.analyzeCorpus();
      };
    })(this));
    if (USE_SAMPLE) {
      this.processToneResults(toneSample);
    }
    // request.post('https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-19')
    //   .send({ text: 'Hello my friend'})
    //   .set('Accept', 'application/json')
    //   .end( function(err, res, body) {
    //     if(res && res.statusCode === 200) {
    //       console.log(body);
    //       this.processToneResults(body);
    //     } else {
    //       console.log('status', res.statusCode);
    //     }
    //   });
  };

  Main.prototype.processToneResults = function(results) {
    console.log(results);
    // results.document_tone
    var toneCategories = results.document_tone.tone_categories;
    console.log(toneCategories);
    toneCategories.forEach((function(_this) {
      return function(category) {
        if(category.category_id === 'emotion_tone') {
          _this.model.setDiffDeep('emotionTones', category.tones);
        }
        else if(category.category_id === 'social_tone') {
          _this.model.setDiffDeep('socialTones', category.tones);
        }
        else if(category.category_id === 'language_tone') {
          _this.model.setDiffDeep('languageTones', category.tones);
        }

        return;
      };
    })(this));

    // toneCategories.forEach(function(_) {
    //   return function(category) {
    //     if(category.category_id === 'emotion_tone') {
    //       console.log('category.tones');
    //       console.log(category.tones);
    //       _this.model.setDeepDiff('emotionTones', category.tones);
    //     }
    //   };
    // });
  }

  Main.prototype.analyzeCorpus = function() {
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
    this.agenticAdjectives.set(Object.keys(agentic));
    this.communalAdjectives.set(Object.keys(communal));
  };

  return Main;
})();
