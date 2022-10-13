// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./swiper.css";

// import required modules
import { Pagination } from "swiper";


export const Slider = ({ products }) =>{
  return (
    <>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          products.map( (product) => (
            <SwiperSlide key={ product._id } style={{ backgroundColor: '#FBAB7E',
              backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)' }}><img style={{ height: 300, width: 200 }} src={ ( product.image ) ? require(`../../../assets/img/${ product.image }`) : null } alt="Product" /></SwiperSlide>
          ))
        }

      </Swiper>
    </>
  );
}
