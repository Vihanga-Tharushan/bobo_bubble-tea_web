export default function ProductCard(props) {

    console.log("ProductCard component rendered");
    console.log("Received props:", props);
    return (  //just a dummy card for now, will be edited later
       <div className="productCard">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>Price: Rs. {props.price.toFixed(2)}</p>
            <img src={props.image} alt="Product Image" />

       </div>
    );
}