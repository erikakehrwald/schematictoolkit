class Border {

  constructor(config) {
    this.allPalettes = [];
    this.currentPalettes = [];
    this.currentColorIndex = 0;
    this.transitionDelay = config.delay;

    this.initPalettes();
    this.startBorderInterval();
  }

  initPalettes() {
    var that = this;
    $('.button-group').children().each(function(i, item) {
      let palette = [];
      $(item).children().each(function(j, circle){
          palette.push($(circle).css("background-color"));
      });

      if (palette.length > 0){
        that.allPalettes.push(palette);
      }
    });
  }

  startBorderInterval() {
    var that = this;
    this.interval = setInterval(function(){
      if (that.currentPalettes.length > 0) {
        var index = that.currentColorIndex % that.currentPalettes.length;
        $('body').css('border-color', that.currentPalettes[index]);
        that.currentColorIndex += 1;
      }
      else {
        for (let palette of that.allPalettes) {
          that.currentPalettes.push(...palette);
        }
      }
    }, this.transitionDelay * 1000);
  }

  handleClick(event) {
    var selectedIndices = [];

    // resetting stuff
    this.currentPalettes = [];
    this.currentColorIndex = 0;

    $('.button-group .button').each(function(i, button){

      var button = $(button);
      if (button.hasClass('is-checked')){
        var index = button.data('filter').match(/\d+/) - 1;
        selectedIndices.push(index)
      }
    });
    
    for (var index of selectedIndices){
      var currentPalette = this.allPalettes[index];
      this.currentPalettes.push(...currentPalette);
    }
  }

}