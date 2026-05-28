import { FaPlus } from "react-icons/fa";
import useCartStore from "../../store/cartStore";
import { useState } from "react";
import ProductQuickView from "./ProductQuickView";

const BASE_URL = "/backend/";
const FALLBACK = "/logo.PNG";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const isInStock = Number(product?.in_stock) === 1;

  return (
    <div className="relative overflow-hidden w-full flex flex-col">
      {/* الصورة */}
      <div className="relative overflow-hidden aspect-[3/4] w-full bg-gray-100">
        {/* Skeleton placeholder */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        <button
          type="button"
          onClick={() => setShowQuickView(true)}
          className="absolute inset-0 z-0 block w-full h-full p-0 border-0 cursor-pointer group/img"
          aria-label={`معاينة ${product.name}`}
        >
          <img
            src={imgError ? FALLBACK : BASE_URL + product.image}
            alt={product.name}
            width={300}
            height={400}
            className={`w-full h-full object-cover transition-all duration-300 group-hover/img:scale-[1.02]
              ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              setImgError(true);
              setImgLoaded(true);
            }}
          />
        </button>
      </div>

      {/* النص */}
      <button
        type="button"
        onClick={() => setShowQuickView(true)}
        className="w-full text-center px-3 pt-3 pb-2 border-0 bg-transparent cursor-pointer hover:opacity-90 transition-opacity flex flex-col items-center flex-1"
      >
        <h3 className="title-lg mb-1 line-clamp-2 w-full">{product.name}</h3>
        <p className="text-caption mb-2 line-clamp-2 w-full">
          {product.description}
        </p>
        <div className="flex items-center justify-center gap-1 mt-auto pt-1">
          <span className="text-error font-semibold">{product.price}</span>
          <p className="text-error text-sm">دينار كويتي</p>
        </div>
      </button>

      {/* زر السلة */}
      <button
        type="button"
        disabled={!isInStock}
        onClick={() => {
          if (isInStock) addToCart(product);
        }}
        className="w-full flex items-center justify-between gap-2 bg-brand text-white py-3 px-4 transition-colors duration-300 hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand"
      >
        <span className="flex-1 text-center text-sm font-medium">
          {isInStock ? "إضافة للسلة" : "غير متوفر"}
        </span>
        {isInStock && <FaPlus size={14} />}
      </button>

      {showQuickView && (
        <ProductQuickView
          key={
            product.lineKey ?? `${product.item_type ?? "product"}:${product.id}`
          }
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </div>
  );
}
