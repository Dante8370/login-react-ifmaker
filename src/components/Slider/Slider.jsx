import {useState, useEffect} from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import './Slider.css';


function Slider () {
    const [slidePerview, setSlidePerview] = useState(2);
    const data = [
        {id: '1', image: "https://i.pinimg.com/736x/41/87/41/4187411b037d83566e79529c206c74bf.jpg"},
        {id: '2', image: "https://i.pinimg.com/736x/f8/be/66/f8be6651fbf3e0d9a9b11271c97ed306.jpg"},
        {id: '3', image: "https://i.pinimg.com/736x/0b/1a/84/0b1a84cd3d3a9dd6c321ca9940db703d.jpg"},
        {id: '4', image: "https://i.pinimg.com/736x/58/0a/c0/580ac081675ef135847c9f55d6c9550b.jpg"},
        {id: '5', image: "https://i.pinimg.com/736x/c9/1e/54/c91e5410c3a22fe08e54063100a66b78.jpg"}
    ];

    useEffect(() => {
        function handleResize(){
            if (window.innerWidth < 720){
            setSlidePerview(1); 
            }else{
                setSlidePerview(2);
            };
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () =>{
            window.removeEventListener("resize", handleResize);
        };
    
    }, []);

    return (
        <div className="container-Home">
            <Swiper
                className='slider-container'
                slidesPerView={slidePerview}
                pagination={{clickable:true}} 
                navigation
            >
                {data.map( (item) => (
                    <SwiperSlide key={item.id}>
                        <img 
                         src= {item.image} 
                         alt="Slider" 
                         className='slide-item' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
       
    )
}

export default Slider;