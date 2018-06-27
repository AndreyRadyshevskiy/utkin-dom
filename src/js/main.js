$(function(){

  $('.main-menu').on('click', function(e){
    
    $(e.target).next('.sub-menu').stop().slideToggle(200);
  
  });

  $('.search__button').click(function(e){
    $('.search__field').stop().slideToggle(200);
    $('.search__inner input[type=text]').focus();
    $(this).toggleClass('active');
  });

  $(document).keyup(function(e){
    if (e.keyCode === 27) {
      $('.search__field').slideUp();
    }
  }).click(function() {
    $('.search__field').slideUp();
  });

  $('.search').click(function(e) {
    e.stopPropagation();
  });

  $('.search__menu').on({
    mouseenter: function() 
    {
      $('.search__sub-menu').slideDown(200);
      $('.search__arrow').css('transform', 'rotateZ(180deg)');
    },
    mouseleave: function()
    {
      $('.search__sub-menu').slideUp(200);
      $('.search__arrow').css('transform', 'rotateZ(0)');
    }
});

  // Masonry Grid
  $('.masonry-grid').masonry({
    // options
    columnWidth: 270,
    horizontalOrder: true,
    gutter: 30
  });

});