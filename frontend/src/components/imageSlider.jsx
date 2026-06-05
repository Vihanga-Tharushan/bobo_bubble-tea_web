import { useState } from "react";

export default function ImageSlider(props) {

    const images = props.images;
    const [activeImage, setActiveImage] = useState(0);

    return (

            <div className="w-125 h-125 relative">
               
                <img src={images[activeImage]} alt="Product Image 1" className="w-full h-100 object-contain" />
                <div className="w-full h-25 absolute bottom-0 left-0 flex items-center justify-center gap-2 ">
                    {images.map((img, index) => (
                        <img onClick={() => setActiveImage(index)} key={index} src={img} alt={"Thumbnail " + (index + 1)} className={`w-12 h-18 object-cover  cursor-pointer border-2 ${activeImage === index ? "border-accent" : "border-transparent"}`} />
                    ))}

                </div>
               
            </div>
    )
}