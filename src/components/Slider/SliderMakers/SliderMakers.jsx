import {useState, useEffect} from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import './SliderMakers.css';


function SliderMakers () {
    const [slidePerview, setSlidePerview] = useState(3);
    const data = [
        {
          id: '1',
          name: "Darlan",
          description: "Desenvolvedor Full Stack com foco em aplicações React e Firebase. Atua também como organizador de projetos no IFMaker, buscando sempre soluções inovadoras.",
          image: "https://i.pinimg.com/736x/41/87/41/4187411b037d83566e79529c206c74bf.jpg"
        },
        {
          id: '2',
          name: "Henrique",
          description: "Designer e especialista em impressão 3D. Atua na modelagem de projetos físicos e identidade visual dos produtos desenvolvidos pelo IFMaker.",
          image: "https://i.pinimg.com/736x/f8/be/66/f8be6651fbf3e0d9a9b11271c97ed306.jpg"
        },
        {
          id: '3',
          name: "Laura",
          description: "Especialista em impressão 3D. Atua na modelagem de projetos físicos e identidade visual dos produtos desenvolvidos pelo IFMaker.",
          image: "https://i.pinimg.com/736x/0b/1a/84/0b1a84cd3d3a9dd6c321ca9940db703d.jpg"
        },
        {
          id: '4',
          name: "Miqueias",
          description: "Técnico em Eletrônica com experiência em automação utilizando Arduino e ESP32. Responsável por testes de protótipos no laboratório.",
          image: "https://i.pinimg.com/736x/58/0a/c0/580ac081675ef135847c9f55d6c9550b.jpg"
        },
        {
          id: '5',
          name: "Regivaldo",
          description: "Professor orientador do IFMaker. Atua como mentor técnico e administrativo dos projetos, garantindo a excelência nas entregas.",
          image: "https://i.pinimg.com/736x/c9/1e/54/c91e5410c3a22fe08e54063100a66b78.jpg"
        }
      ];
      

    useEffect(() => {
        function handleResize(){
            if (window.innerWidth < 720){
            setSlidePerview(1); 
            }else{
                setSlidePerview(3);
            };
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () =>{
            window.removeEventListener("resize", handleResize);
        };
    
    }, []);

    return (
        <div className="container-slider">
            <Swiper
                slidesPerView={slidePerview}
                pagination={{clickable:true}} 
                navigation
                spaceBetween={20}
            >
                {data.map( (item) => (
                    <SwiperSlide key={item.id}>
                        <div className="maker">
                            <img 
                            src= {item.image} 
                            alt="Slider" 
                            className='item-slider' />
                            <div className="description">
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
       
    )
}

export default SliderMakers;