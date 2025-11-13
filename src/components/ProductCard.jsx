export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-md transition">
      <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={() => onAdd(product)}
        className="bg-green-500 text-white w-full mt-2 rounded py-1"
      >
        Add to Cart
      </button>
    </div>
  );
}
