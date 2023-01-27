import Plyr from 'plyr'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';


/**
 * @source: https://codepen.io/hanieldaniel/pen/omdKoO
 */

$(document).ready(function(){
    ($('.owl-carousel') as any).owlCarousel({
    stagePadding: 200,
    loop:true,
    margin:10,
    items:1,
    nav:true,
    responsive:{
        0:{
            items:1,
            stagePadding: 60
        },
        600:{
            items:1,
            stagePadding: 100
        },
        1000:{
            items:1,
            stagePadding: 200
        },
        1200:{
            items:1,
            stagePadding: 250
        },
        1400:{
            items:1,
            stagePadding: 300
        },
        1600:{
            items:1,
            stagePadding: 350
        },
        1800:{
            items:1,
            stagePadding: 400
        }
    }
})

var playerSettings = {
      controls : ['play-large'],
      fullscreen : { enabled: false},
      resetOnEnd : true,
      hideControls  :true,
        clickToPlay:true,
    //   keyboard : false,
}

const players = Plyr.setup('.js-player', playerSettings);

players?.forEach(function(instance: any, index: number) {
    instance.on('play',function(){
        players.forEach(function(instance1: any,index1: number){
            if(instance != instance1){
                instance1.pause();
            }
        });
    });
});

$('.video-section').on('translated.owl.carousel', function (event) {
  players?.forEach(function(instance: any,index1: number){
        instance.pause();
    });
});

});



export interface IOwlCarouselItem {
    src: string,
    poster?: string,
    label?: string
}