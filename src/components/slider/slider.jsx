import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.scss'

const SliderComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear",

    };

    return (
        <div className="sliderWrapper">
            <Slider {...settings}>

                <div className="slider1">
                    <img src="http://localhost:3000/images/slider1.jpeg" alt='slider1' />
                </div>

                <div className="slider2">
                    <img src="http://localhost:3000/images/slider2.jpeg" alt='slider2' />
                </div>

                <div className="slider3">

                    <img src="http://localhost:3000/images/slider3.jpeg" alt='slider3' />
                </div>

                <div className="slider4">

                    <img src="http://localhost:3000/images/slider4.jpeg" alt='slider3' />
                </div>



            </Slider>
        </div>
    );
};

export default SliderComponent;
