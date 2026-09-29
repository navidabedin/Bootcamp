// کامپوننت فرزند: داده را از props میگیرد و نمایش میدهد
function ProductCard({ name, price, description }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p className="product-price">{price} T</p>
      <p className="product-description">{description}</p>
    </div>
  );
}

export default ProductCard;
