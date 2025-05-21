import { Stack } from "react-bootstrap";
import { CartItem, userActions } from "../../store/user-redux";
import "./CartRecord.scss";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";

const CartRecord: React.FC<{ cart_product: CartItem }> = ({ cart_product }) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleOnRemoveProduct = async (product: CartItem) => {
    if (user) {
      const response = await fetch(
        "http://localhost:5000/api/users/remove_from_cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user._id,
            product_id: product.originalProduct._id,
            product_size: product.size,
          }),
        }
      );

      if (!response.ok)
        throw new Response("Error while removing product.", {
          status: 500,
        });

      if (product && response.ok) {
        dispatch(
          userActions.removeFromCart({
            size: product.size,
            price: product.price,
            originalProduct: product.originalProduct,
          })
        );
      }
      const resData = await response.json();
    }
  };

  return (
    <Stack direction="horizontal" className="cart-item" gap={4}>
      <img src={`/images/menu/${cart_product.originalProduct.image}`} />
      <Stack direction="vertical">
        <p>{cart_product.originalProduct.name}</p>
        <div className="special-blocks">
          <p>{cart_product.size}</p>
          <p>
            {
              cart_product.originalProduct.extras[
                Math.floor(Math.floor(Math.random() * 2))
              ]
            }
          </p>
        </div>
      </Stack>
      <button
        className="delete-button"
        onClick={() => handleOnRemoveProduct(cart_product)}
      >
        <RxCross2 />
      </button>
    </Stack>
  );
};

export default CartRecord;
