import { LuTableProperties } from "react-icons/lu";
import { TbLabelFilled } from "react-icons/tb";

export function loadCart() {
    
    let cartData = localStorage.getItem("cart"); // Retrieve cart data from localStorage like "cart": "[item1, item2, ...]"

    if(cartData == null){
        localStorage.setItem("cart", "[]"); // If no cart data exists, initialize it as an empty array
        cartData = "[]";
    }

    const cart = JSON.parse(cartData); // Parse the cart data from JSON string to JavaScript array

    return cart; // Return the cart array
}

export function addToCart(product, quantity) {
    
    let cart = loadCart(); // Load the current cart

    const existingItemIndex = cart.findIndex(
        (item) => {
            return item.productId === product.productId; // Check if the product already exists in the cart
        }
    );

   if (existingItemIndex == -1) {  // If the product does not exist in the cart, add it as a new item
        

        if(quantity < 1){
            console.log("Quantity must be at least 1");
            return;
        }

        const cardItem = {
            productId: product.productId,
            name: product.name,
            labelPrice: product.labelPrice,
            price: product.price,
            quantity: quantity,
            image: product.images[0] 
        }

        cart.push(cardItem); // Add the new item to the cart  

   }else {                         // If the product already exists in the cart, update the quantity
        

        const existingItem = cart[existingItemIndex];

        const newQuantity = existingItem.quantity + quantity;

        if(newQuantity < 1){
           
            cart = cart.filter(
                (item) => {
                    
                    return item.productId !== product.productId; // Remove the item from the cart if the new quantity is less than 1
                } 
            );

        }else {
            cart[existingItemIndex].quantity = newQuantity; // Update the quantity of the existing item in the cart
        }

   }

    localStorage.setItem("cart", JSON.stringify(cart));

}

export function updateQuantity(productId, delta) {
    let cart = loadCart();
    const index = cart.findIndex((item) => item.productId === productId);
    if (index === -1) return;
    const newQty = cart[index].quantity + delta;
    if (newQty < 1) {
        cart = cart.filter((item) => item.productId !== productId);
    } else {
        cart[index].quantity = newQty;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}

export function removeFromCart(productId) {
    let cart = loadCart();
    cart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}