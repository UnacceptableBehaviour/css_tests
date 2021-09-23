window.addEventListener('load',function(){
  document.querySelector('.glider').addEventListener('glider-slide-visible', function(event){
      var glider = Glider(this);
      console.log('Slide Visible %s', event.detail.slide)
  });
  document.querySelector('.glider').addEventListener('glider-slide-hidden', function(event){
      console.log('Slide Hidden %s', event.detail.slide)
  });
  document.querySelector('.glider').addEventListener('glider-refresh', function(event){
      console.log('Refresh')
  });
  document.querySelector('.glider').addEventListener('glider-loaded', function(event){
      console.log('Loaded')
  });


  // see 'top ten slider - notes' for anotated setup

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // text cards
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#recipe-titles'), {
      slidesToShow: 6, //'auto',
      slidesToScroll: 1,
      itemWidth: 300,
      draggable: true,
      scrollLock: false,
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
      //responsive: [
      //    {
      //        breakpoint: 800,
      //        settings: {
      //            slidesToScroll: 'auto',
      //            itemWidth: 300,
      //            slidesToShow: 'auto',
      //            exactWidth: true
      //        }
      //    },
      //    {
      //        breakpoint: 700,
      //        settings: {
      //            slidesToScroll: 4,
      //            slidesToShow: 4,
      //            dots: false,
      //            arrows: false,
      //        }
      //    },
      //    {
      //        breakpoint: 600,
      //        settings: {
      //            slidesToScroll: 3,
      //            slidesToShow: 3
      //        }
      //    },
      //    {
      //        breakpoint: 500,
      //        settings: {
      //            slidesToScroll: 2,
      //            slidesToShow: 2,
      //            dots: false,
      //            arrows: false,
      //            scrollLock: true
      //        }
      //    }
      //]
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#sushi-g'), {
      slidesToShow: 1, //'auto',
      slidesToScroll: 1,
      itemWidth: 150,
      draggable: true,
      scrollLock: false,
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
      responsive: [
          {
              breakpoint: 800,
              settings: {
                  slidesToScroll: 'auto',
                  itemWidth: 300,
                  slidesToShow: 'auto',
                  exactWidth: true
              }
          },
          {
              breakpoint: 700,
              settings: {
                  slidesToScroll: 4,
                  slidesToShow: 4,
                  dots: false,
                  arrows: false,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToScroll: 3,
                  slidesToShow: 3
              }
          },
          {
              breakpoint: 500,
              settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2,
                  dots: false,
                  arrows: false,
                  scrollLock: true
              }
          }
      ]
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#bread-g'), {
      slidesToShow: 2, //'auto',
      slidesToScroll: 2,
      itemWidth: 150,
      draggable: true,
      scrollLock: false,
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
      responsive: [
          {
              breakpoint: 800,
              settings: {
                  slidesToScroll: 'auto',
                  itemWidth: 150,
                  slidesToShow: 'auto',
                  exactWidth: true
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToScroll: 4,
                  slidesToShow: 4
              }
          },
          {
              breakpoint: 500,
              settings: {
                  slidesToScroll: 3,
                  slidesToShow: 3,
                  dots: false,
                  arrows: false,
                  scrollLock: true
              }
          }
      ]
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#comfort-g'), {
      slidesToShow: 1, //'auto',
      slidesToScroll: 1,
      itemWidth: 150,
      draggable: true,
      scrollLock: false,
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
      responsive: [
          {
              breakpoint: 800,
              settings: {
                  slidesToScroll: 'auto',
                  itemWidth: 300,
                  slidesToShow: 'auto',
                  exactWidth: true
              }
          },
          {
              breakpoint: 700,
              settings: {
                  slidesToScroll: 4,
                  slidesToShow: 4,
                  dots: false,
                  arrows: false,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToScroll: 3,
                  slidesToShow: 3
              }
          },
          {
              breakpoint: 500,
              settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2,
                  dots: false,
                  arrows: false,
                  scrollLock: true
              }
          }
      ]
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#cheese-g'), {
      slidesToShow: 1, //'auto',
      slidesToScroll: 1,
      itemWidth: 150,
      draggable: true,
      scrollLock: false,
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
      responsive: [
          {
              breakpoint: 800,
              settings: {
                  slidesToScroll: 'auto',
                  itemWidth: 300,
                  slidesToShow: 'auto',
                  exactWidth: true
              }
          },
          {
              breakpoint: 700,
              settings: {
                  slidesToScroll: 4,
                  slidesToShow: 4,
                  dots: false,
                  arrows: false,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToScroll: 3,
                  slidesToShow: 3
              }
          },
          {
              breakpoint: 500,
              settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2,
                  dots: false,
                  arrows: false,
                  scrollLock: true
              }
          }
      ]
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#make_sroll-g'), {
      slidesToShow: 1, //'auto',
      slidesToScroll: 1,
      itemWidth: 150,
      draggable: true,
      scrollLock: false,
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
      responsive: [
          {
              breakpoint: 800,
              settings: {
                  slidesToScroll: 'auto',
                  itemWidth: 300,
                  slidesToShow: 'auto',
                  exactWidth: true
              }
          },
          {
              breakpoint: 700,
              settings: {
                  slidesToScroll: 4,
                  slidesToShow: 4,
                  dots: false,
                  arrows: false,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToScroll: 3,
                  slidesToShow: 3
              }
          },
          {
              breakpoint: 500,
              settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2,
                  dots: false,
                  arrows: false,
                  scrollLock: true
              }
          }
      ]
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#sweet-g'), {
      slidesToShow: 'auto',
      slidesToScroll: 'auto',
      itemWidth: 240,
      exactWidth: true,
      draggable: true,
      scrollLock: false,
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
  });


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // top ten slider - notes
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#movies-g'), {
      // Mobile first defaults
      // default settings if no breakpoint in play
      slidesToShow: 'auto',   //1, //'auto',
      slidesToScroll: 'auto', //1,
      itemWidth: 50,          // css debug in chrome say 53.5px - hovering say 150px ??
      draggable: true,
      dragVelocity: 3.3,      // default 3.3 - movement of slider relative mouse
      scrollLock: false,      // set to false to turn off snap to movie/element
      dots: false,            // '#dots', to show dots
      rewind: true,
      arrows: {               // class tags for arrow buttons
          prev: '.glider-prev',
          next: '.glider-next'
      },
      responsive: [
          {
              breakpoint: 800,            // setting above 800px
              settings: {
                  slidesToScroll: 'auto',
                  itemWidth: 150,        // ignored unless slidesToShow:auto & exactWidth:false
                  slidesToShow: 5,       // if 'auto' calculated based on itemWidth & viewport
                  exactWidth: false      // if true ignore slidesToShow setting
              }
          },
          {
              breakpoint: 700,            // setting above 700px
              settings: {
                  slidesToScroll: 4,      // when button is pressed scroll this no of slides
                  slidesToShow: 4,        // obvious
                  dots: false,
                  arrows: false,
              }
          },
          {
              breakpoint: 600,            // setting above 600px
              settings: {
                  slidesToScroll: 3,
                  slidesToShow: 3
              }
          },
          {
              breakpoint: 500,            // setting above 500px
              settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2,
                  dots: false,
                  arrows: false,
                  scrollLock: true
              }
          }
      ]
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // top ten slider 2
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  window._ = new Glider(document.querySelector('#movies-g2'), {
      slidesToShow: 1, //'auto',
      slidesToScroll: 1,
      itemWidth: 50,
      draggable: true,
      dragVelocity: 3.3,     // default 3.3
      scrollLock: false,   // set to false to turn off snap to movie
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
      responsive: [
          {
              breakpoint: 800,
              settings: {
                  slidesToScroll: 'auto',
                  itemWidth: 300,
                  slidesToShow: 'auto',
                  exactWidth: true
              }
          },
          {
              breakpoint: 700,
              settings: {
                  slidesToScroll: 4,
                  slidesToShow: 4,
                  dots: false,
                  arrows: false,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToScroll: 3,
                  slidesToShow: 3
              }
          },
          {
              breakpoint: 500,
              settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2,
                  dots: false,
                  arrows: false,
                  scrollLock: true
              }
          }
      ]
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //window._ = new Glider(document.querySelector('.glider'), {homegrown-g
  window._ = new Glider(document.querySelector('#homegrown-g'), {
      slidesToShow: 1, //'auto',
      slidesToScroll: 1,
      itemWidth: 150,
      draggable: true,
      scrollLock: false,
      dots: '#dots',
      rewind: true,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },
      responsive: [
          {
              breakpoint: 800,
              settings: {
                  slidesToScroll: 'auto',
                  itemWidth: 300,
                  slidesToShow: 'auto',
                  exactWidth: true
              }
          },
          {
              breakpoint: 700,
              settings: {
                  slidesToScroll: 4,
                  slidesToShow: 4,
                  dots: false,
                  arrows: false,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToScroll: 3,
                  slidesToShow: 3
              }
          },
          {
              breakpoint: 500,
              settings: {
                  slidesToScroll: 2,
                  slidesToShow: 2,
                  dots: false,
                  arrows: false,
                  scrollLock: true
              }
          }
      ]
  });

});
