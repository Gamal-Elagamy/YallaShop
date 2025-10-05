import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../Services/CartServices";
import {
  addProductWishList,
  clearWishList,
  getWishlist,
} from "../../Services/WishListSevices";

export default function Product({ product }) {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [wishListLoading, setWishListLoading] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    async function checkWishlist() {
      const data = await getWishlist();
      setAddedToWishlist(data.some((item) => item._id === product._id));
    }
    checkWishlist();
  }, [product._id]);

  const handleWishlist = async () => {
    if (addedToWishlist) {
      await clearWishList(product._id, setWishListLoading);
      setAddedToWishlist(false);
    } else {
      await addProductWishList(product._id, setWishListLoading);
      setAddedToWishlist(true);
    }
  };

  return (
    <div className="product relative flex w-full flex-col overflow-hidden rounded-xl border border-green-300 bg-gradient-to-b from-white to-gray-50 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      <Link
        to={"/ProductDetails/" + product._id + "/" + product.category.name}
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
      >
        <img
          className="object-cover rounded mx-auto transition-transform duration-500 hover:scale-110"
          src={product.imageCover}
          alt="product image"
        />
        {product.priceAfterDiscount && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {(
              100 -
              (product.priceAfterDiscount * 100) / product.price
            ).toFixed(0)}
            % OFF
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-grow mt-4 px-5 pb-5">
        <Link
          to={"/ProductDetails/" + product._id + "/" + product.category.name}
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight main-text-color line-clamp-1">
            {product.title}
          </h5>
        </Link>

        <div className="mt-2 mb-5 flex flex-col items-center justify-between flex-grow">
          {product.priceAfterDiscount ? (
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.priceAfterDiscount}
              </p>
              <p className="text-xl text-gray-500 line-through dark:text-gray-400">
                ${product.price}
              </p>
              <p className="text-xs mt-1 font-medium main-text-color">
                ⏳ Limited-time offer!
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </p>
              <p className="text-xs mt-1 font-medium main-text-color">
                🚀 Exciting offers coming soon!
              </p>
            </div>
          )}

          <div className="flex items-center mt-3">
            {[1, 2, 3, 4, 5].map((rate) => (
              <svg
                key={rate}
                aria-hidden="true"
                className={`h-5 w-5 ${
                  rate <= product.ratingsAverage
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 rounded bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold dark:bg-yellow-300 text-white dark:text-gray-800">
              {product.ratingsAverage}
            </span>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <Button
            isLoading={addToCartLoading}
            onPress={() =>
              addProductToCart(product._id, setAddToCartLoading)
            }
            className="btn w-full rounded-lg px-4 py-2 text-sm font-semibold text-white btn-gradient"
          >
            🛒 Add To Cart
          </Button>

          <Button
            isLoading={wishListLoading}
            onPress={handleWishlist}
            className={`btn2 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md ${
              addedToWishlist ? "bg-red-600" : ""
            }`}
          >
            {addedToWishlist ? "❤️ Remove from Wishlist" : "💖 Add to Wishlist"}
          </Button>
        </div>
      </div>
    </div>
  );
}
