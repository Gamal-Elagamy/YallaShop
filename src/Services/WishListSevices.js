import axios from "axios";
import showToast from "../Component/Toasts/Toasts";

export async function addProductWishList(productId, setLoading) {
  try{
  if (setLoading) setLoading(true);
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { productId },
    { headers: { token: localStorage.getItem("token") } }
  );
  showToast("success", data.message);
  }
  catch(error){
    const msg = error.data?.message;
    showToast("error", msg);
  }
  finally{
    if (setLoading) setLoading(false);
  }
}
   

export async function clearWishList(productId, setLoading) {
  try{
    if (setLoading) setLoading(true);
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: { token: localStorage.getItem("token") } }
    );
  }
  catch(error){
    const msg = error.data?.message;
    showToast("error", msg);
  }
  finally{
    if (setLoading) setLoading(false);
  }

}

export async function getWishlist() {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { headers: { token: localStorage.getItem("token") } }
  );

  return data?.data;
}
