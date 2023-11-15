import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";


function Hero() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          style={{ height: "500px", width: "100%" }}
          src="https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="First slide"
        />
        <Carousel.Caption >
          <h3 className="fw-bolder fs-1 text-white  ">First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "500px", width: "100%" }}
          src="https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="fw-bolder fs-1 text-white  ">Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "500px", width: "100%" }}
          src="https://images.pexels.com/photos/16018144/pexels-photo-16018144/free-photo-of-pessoa-programando-hacker.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2g"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="fw-bolder fs-1 text-white  ">Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Hero;

