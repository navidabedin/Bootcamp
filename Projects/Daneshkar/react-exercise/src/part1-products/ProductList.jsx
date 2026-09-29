import ProductCard from './ProductCard';

// کامپوننت پدر
function ProductList() {
  const products = [
    {
      id: 1,
      name: 'Espresso',
      price: 95000,
      description: 'Strong, high-caffeine coffee with a bitter, authentic taste',
    },
    {
      id: 2,
      name: 'Latte',
      price: 135000,
      description: 'A blend of espresso and steamed milk with soft, velvety foam; a rich, high-caffeine coffee with a bold, authentic, bitter taste',
    },
    {
      id: 3,
      name: 'Cappucino',
      price: 125000,
      description: 'Espresso with milk and a thick layer of foam; a balanced flavor',
    },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
}

export default ProductList;
