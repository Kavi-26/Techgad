function ProductCard({ product }) {
    return (
      <div style={{ border: '1px solid #ddd', padding: '20px', margin: '20px', textAlign: 'center' }}>
        <img src={product.image} alt={product.name} style={{ width: '100px' }} />
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <button style={{ padding: '10px', backgroundColor: '#333', color: '#fff', cursor: 'pointer' }}>Add to Cart</button>
      </div>
    );
  }
  
  export default ProductCard;
  