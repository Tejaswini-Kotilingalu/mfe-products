import './ProductList.css';
import React from 'react';

const products = [
  { id: 1, name: "Shoes", price: 2000 },
  { id: 2, name: "Shirt", price: 1000 },
];

export default function ProductList() {
  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          {p.name} - ₹{p.price}
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}