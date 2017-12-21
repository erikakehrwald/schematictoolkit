class Filter {

    constructor() {
        this.filters = {};
        this.$grid = $('.grid').isotope({
          itemSelector: '.screen-types'
        });
    }

    // filter out .screen and .screen-types classes
    classFilter (classes) {
      if (/screen/i.test(classes)) {
        return false
      } else {
        return true;
      }
    }

    addFilter( filter, uiGroup ) {
        var that = this;
        uiGroup.forEach(function(category) {
          if (category !== 'ui-group') {
            if (!that.filters[category]) {
              that.filters[category] = [];
            }
            that.filters[category].push(filter);
            console.log('filters: ',that.filters);
          }
        });
    }

    removeFilter( filter, uiGroup ) {
        var that = this;
        uiGroup.forEach(function(category) {
            if (category !== 'ui-group') {
                if (that.filters[category]) {
                    var index = that.filters[category].indexOf(filter);
                    if (index !== -1) {
                        that.filters[category].splice(index, 1);
                    }       
                    console.log('filters: ', that.filters);
                }
            }
        });
    }

    handleClick(event) {
        var $target = $( event.currentTarget );
        $target.toggleClass('is-checked');
        var isChecked = $target.hasClass('is-checked');
        var filter = $target.attr('data-filter');
        var uiGroup = $target.closest('.ui-group').attr('class').split(/\s+/);

        if ( isChecked ) {
            this.addFilter( filter, uiGroup );
        } else {
            this.removeFilter( filter, uiGroup );
        }

        var that = this;
        var filterFn = function() {
            var self = $(this);
            var match = false;
            var noMatch = false;
            // get array of element's classes
            var elClasses = self.attr("class")
              .split(/\s+/)
              .filter(function(item) {
                return that.classFilter(item);
              })
              .map(function(item) {
                return '.' + item;
              });
            // iterate over filters to check if it exists in the element's classes
            for (var key in that.filters) {
              if (that.filters.hasOwnProperty(key)) {
                var filterCategory = that.filters[key];
                if (filterCategory.length) {
                  var isFound = false;
                  for (var i = 0; i < filterCategory.length; i++) {
                    (function(i) {
                      var filterClass = filterCategory[i];
                      // if element's classList contains one of the filters, mark filter as found and exit
                      if (elClasses.indexOf(filterClass) >= 0) {
                        isFound = true;
                        return;
                      } 
                    })(i);
                    // if class is found for this category, skip to next category
                    if (isFound) {
                      break;
                    }
                  }
                  // if there is no match for 1 filter, there cannot be a match so skip to next elemnent
                  if (!isFound) {
                    noMatch = true;
                    break;
                  }
                } 
              }
            }
            if (noMatch) {
              return false;
            } else {
              return true;
            }
        };
        this.$grid.isotope({ filter: filterFn });
    }

}