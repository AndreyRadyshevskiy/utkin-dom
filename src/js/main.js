$(function(){

  $('.main-menu').on('click', function(e){
    
    $(e.target).next('.sub-menu').stop().slideToggle(200);
    
    e.preventDefault();
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
  const grid = $('.masonry-grid').isotope({
    // options
    itemSelector: '.grid-item',
    getSortData: {
      popular: '[data-popularity-index]',
      id: '[data-id] parseInt',
      recent: function( itemElem ) {
        const dateArr = $( itemElem ).find('time').attr('datetime').split('-');
        const date = new Date(dateArr[2], parseInt(dateArr[1], 10) - 1, dateArr[0]);
        return date.getTime();
      }
    },
    masonry: {
      columnWidth: 270,
      gutter: 30,
      horizontalOrder: true
    }
  });

  $('.articles__filter').on('change', 'input', function(){
    var filterValue = $(this).attr('data-filter');
    if(this.checked) {
      grid.isotope({
        sortBy: filterValue,
        sortAscending: false
      });
    } else {
      grid.isotope({
        sortBy: 'id',
        sortAscending: true,
      });
    }
  });

  // EXPERTS

  $('.experts__thumbs').on('click', '.thumb', function(){
    let suffix = $(this).find('img').attr('src').match(/\d+/);
    
    $('.expert').removeClass('active');
    $('.expert[data-id="'+suffix+'"]').css('opacity', 0).toggleClass('active').animate({'opacity': 1}, 1000);
    console.log('clicked');
  });

});