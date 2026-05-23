import './App.css'
import ProductCard from './components/productCard'

function App() {
  
  return (
    <>
      <h1>Welcome to BOBO</h1>
      <ProductCard name="Sample Product" description="This is a sample product." price={19.99} image="https://images.squarespace-cdn.com/content/v1/68f206cca9dce96f2599130d/1760691951097-4H89SZN5C13SVK7EEHLK/image3.jpg" />
      <br></br>
      <ProductCard name="Another Product" description="This is another sample product." price={29.99} image="https://bubblebliss.uk/wp-content/uploads/2025/05/IMG_2628-scaled.jpeg" />

    </>
  )
}

export default App
