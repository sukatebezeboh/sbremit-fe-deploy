import React, { FC } from 'react'
import Div from './OwlCarousel.css'
import './OwlCarousel.helper'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import { IOwlCarouselItem } from './OwlCarousel.helper'


/**
 * @source: https://codepen.io/hanieldaniel/pen/omdKoO
 */
const OwlCarousel: FC<{items:  IOwlCarouselItem[]}> = ({items}) => {
  return (
    <Div className="owl-carousel video-section owl-theme">
        {
          items.map(item => (
            <div className="item">
              <div>
                <video className="js-player" crossOrigin="" playsInline >
                  <source src={item.src} type="video/mp4" />
                </video>
              </div>
            </div>
          ))
        }
    </Div>
  )
}

export default OwlCarousel
