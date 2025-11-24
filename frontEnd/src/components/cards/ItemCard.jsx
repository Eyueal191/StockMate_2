import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading.jsx";
import { ImageOff } from "lucide-react";

function ItemCard({ product }) {
  const navigate = useNavigate();

  // Product not loaded yet → show loading state
  if (!product) return <Loading />;

  const { _id, name, description, price, stock, image, category } = product;
  const stockClass = stock > 0 ? "text-green-400" : "text-red-400";

  return (
    <div
      className="
        bg-gray-800 shadow-lg rounded-2xl overflow-hidden
        flex flex-col w-full max-w-[440px] p-4
        transition-shadow duration-300 hover:shadow-2xl mx-auto
        gap-4

        /* Responsive heights matching virtualizer estimate */
        h-[540px]       /* mobile 1-column */
        sm:h-[540px]    /* tablet 2-columns */
        md:h-[500px]    /* laptop 3-columns */
        lg:h-[480px]    /* large screens 4-columns */
      "
    >
      {/* Product Image */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full object-cover rounded-t-2xl flex-shrink-0"
          style={{ aspectRatio: "4/3" }}
        />
      ) : (
        <div className="w-full h-[250px] flex items-center justify-center bg-gray-700 rounded-xl">
          <ImageOff className="w-16 h-16 text-gray-400" />
        </div>
      )}

      {/* Product Info */}
      <div className="flex flex-col flex-1 gap-4">
        {/* Category / Name / Description */}
        <div className="flex flex-col gap-1 sm:gap-2">
          <span className="text-sm text-gray-400 tracking-wide">
            {category?.name || "Uncategorized"}
          </span>

          <h2 className="text-lg sm:text-xl font-semibold text-white line-clamp-1">
            {name}
          </h2>

          <p
            className="text-gray-300 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              lineHeight: "1.4rem",
              fontSize: "clamp(0.875rem, 1vw, 1rem)",
            }}
          >
            {description || "No description available"}
          </p>
        </div>

        {/* Price + Stock + Buttons */}
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${stockClass}`}>
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </span>

            <span className="text-base sm:text-lg font-semibold text-white">
              {price ? (
                <>
                  {price} <span className="text-red-400">Birr</span>
                </>
              ) : (
                "N/A"
              )}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate(`/dashboard/items/view/${_id}`)}
              className="py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-sm"
            >
              View Product
            </button>

            <button
              onClick={() => navigate(`/dashboard/items/edit/${_id}`)}
              className="py-2.5 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-sm"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
