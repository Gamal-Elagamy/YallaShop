import React, { useEffect, useState } from "react";
import Loading from "../../Component/Loading/Loading";
import { Button } from "@heroui/react";
import { clearWishList, getWishlist } from "../../Services/WishListSevices";
import { addProductToCart } from "../../Services/CartServices";

export default function WishList() {
  const [cartData, setcartData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null); 
  const [addToCartLoading, setAddToCartLoading] = useState(null);

  useEffect(() => {
    async function fetchWishlist() {
      setisLoading(true);
      const data = await getWishlist();
      setcartData(data);
      setisLoading(false);
    }
    fetchWishlist();
  }, []);

  async function handleRemove(productId) {
    setRemovingId(productId);
    await clearWishList(productId);
    setcartData((prev) => prev.filter((item) => item._id !== productId));
    setRemovingId(null);
  }

  async function handleAddToCart(productId) {
    setAddToCartLoading(productId); 
    try {
      await addProductToCart(productId, () => {}); 
      setcartData((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error(error);
    } finally {
      setAddToCartLoading(null);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Wish List Items{" "}
          <span className="text-red-500 dark:text-red-400">
            ({cartData?.length})
          </span>
        </h1>
      </div>

      {cartData?.length === 0 ? (
        <h2 className="text-center text-xl text-gray-600 dark:text-gray-300 font-semibold mt-10">
          No product in your wish list 😔
        </h2>
      ) : (
        cartData?.map((product) => (
          <div
            key={product._id}
            className="relative border border-green-300 dark:border-gray-700 w-8/12 container justify-between items-center mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md sm:flex sm:justify-start hover:scale-105 transition-all"
          >
          
            <Button
              isLoading={removingId === product._id}
              variant="flat"
              className="absolute top-2 right-2 min-w-0 px-2 bg-transparent"
              onPress={() => handleRemove(product._id)}
              endContent={
                removingId !== product._id && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 duration-150 hover:text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )
              }
            >
            </Button>

            <img
              src={product?.imageCover}
              alt="product-image"
              className="w-full rounded-lg sm:w-40 mt-3"
            />

            <div className="sm:ml-4 my-2 sm:flex sm:w-full sm:justify-between flex flex-col h-full">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg text-start font-bold text-gray-900 dark:text-white">
                  {product?.title}
                </h2>
                <p className="mt-1 text-xs text-start text-gray-700 dark:text-gray-300">
                  ${product?.price}
                </p>
                <h2 className="my-2 text-start text-md text-gray-900 dark:text-gray-300">
                  <span className="font-bold">Category:</span>{" "}
                  {product?.category?.name || "N/A"}
                </h2>
                <h2 className="my-2 text-start text-md text-gray-900 dark:text-gray-300">
                  <span className="font-bold">Brand:</span>{" "}
                  {product?.brand?.name || "N/A"}
                </h2>

              <div className="mt-auto w-6/12 ">
                <Button
                  isLoading={addToCartLoading === product._id}
                  onPress={() => handleAddToCart(product._id)}
                  className="btn w-full rounded-lg px-4 py-2 text-sm font-semibold text-white btn-gradient"
                >
                  🛒 Add to cart
                </Button>
              </div>
              
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
