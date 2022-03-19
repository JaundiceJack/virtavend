// Import Basics
import { useState, useEffect, useRef } from 'react';
// Import Components
import Slide from './slide.js';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Slider = ({
  background="bg-gradient-to-br from-gray-900 to-gray-700",
  slideDelay=400
}) => {
  const [slides, setSlides] = useState([
    { title: "Shirts",    item1: "Crypto",     item2: "Science", item3: "History",     image: "/images/expo1.jpg" },
    { title: "3D Prints", item1: "Spacecraft", item2: "Tools",   item3: "Spare Parts", image: "/images/expo3.jpg" },
    { title: "We Accept", item1: "Bitcoin",    item2: "Monero",  item3: "Dollars",     image: "/images/expo2.jpg" }
  ]);
  const [play, setPlay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scan to the previous slide
  const onBackClick = () => {
    clearTimeout(interval.current);
    interval.current = null;
    setPlay(false);
    onBackSlide();
  };
  const onBackSlide = () => {
    // Present next slide
    setTimeout(() => {
      currentSlide === 0 ? setCurrentSlide(slides.length - 1) : setCurrentSlide(currentSlide - 1);
    }, slideDelay);

    // Fade out the current slide
    setSlides([
      ...slides.slice(0, currentSlide).map(slide => { return {...slide, effect: "fadeFromRight"} }),
      {...slides[currentSlide], effect: "slideLeft"},
      ...slides.slice(currentSlide+1, slides.length).map(slide => { return {...slide, effect: "fadeFromRight"} })
    ]);
  }

  // Scan to the next slide
  const onForwardClick = () => {
    clearTimeout(interval.current);
    interval.current = null;
    setPlay(false);
    onForwardSlide();
  };
  const onForwardSlide = () => {
    // Present next slide after 0.4 seconds
    setTimeout(() => {
      currentSlide === slides.length - 1 ? setCurrentSlide(0) : setCurrentSlide(currentSlide + 1);
    }, slideDelay);

    // Fade out the current slide
    setSlides([
      ...slides.slice(0, currentSlide).map(slide => { return {...slide, effect: "fadeFromLeft"} }),
      {...slides[currentSlide], effect: "slideRight"},
      ...slides.slice(currentSlide+1, slides.length).map(slide => { return {...slide, effect: "fadeFromLeft"} })
    ]);
  }

  // Change the slide every 5 seconds
  const interval = useRef(null);
  const setUpdate = () => {
    interval.current = setTimeout(() => {
      onForwardSlide();
      interval.current = null;
    }, 5000);
  }
  //
  useEffect(() => { !interval.current && play && setUpdate() }, [setUpdate, interval, currentSlide])
  // Clear the timer on unmount
  useEffect(() => () => { interval.current && clearTimeout(interval.current); }, []);

  return (
    <div className={"relative mx-12 my-6 h-56 rounded-lg overflow-hidden " + background}>
      <button onClick={onBackClick}
        className="absolute left-2 top-0 bottom-0 z-30 transform duration-150 hover:scale-x-110">
        <IoIosArrowBack className="text-4xl sm:text-6xl text-yellow-400 shadow-3xl" />
      </button>
      {slides.map((slide, index) => {
        return index === currentSlide && <Slide key={index}
          title={slides[index].title}
          item1={slides[index].item1}
          item2={slides[index].item2}
          item3={slides[index].item3}
          image={slides[index].image}
          effect={slides[index].effect}
        />
      })}
      <button onClick={onForwardClick}
        className="absolute right-2 top-0 bottom-0 z-30 transform duration-150 hover:scale-x-110">
        <IoIosArrowForward className="text-4xl sm:text-6xl text-yellow-400 shadow-3xl" />
      </button>
    </div>
  )
}

export default Slider;
