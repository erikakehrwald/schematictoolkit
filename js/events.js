
var theFilter = new Filter();
var theBorder = new Border({
  delay: 2
});

$('.filters').on( 'click', 'button', function( event ) {
  theFilter.handleClick(event);
  theBorder.handleClick(event);
});