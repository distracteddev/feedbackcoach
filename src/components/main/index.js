module.exports = Main = (function() {
  function Main() {}

  Main.prototype.view = __dirname;

  Main.prototype.init = function() {};

  Main.prototype.clicked = function(e) {
    console.log('clicked');
    console.log(e);
  };

  return Main;
})();
