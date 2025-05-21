import { useRouteLoaderData } from "react-router-dom";
import { Product, SizeOption } from "../../../store/product-redux";
import { useAppSelector } from "../../../store";
import { FormEvent, useEffect, useState } from "react";
import { User, userActions } from "../../../store/user-redux";
import { useDispatch } from "react-redux";
import { Stack, Table } from "react-bootstrap";

type Props = {
  product: Product;
};

const DrinkDetails: React.FC<Props> = ({ product }) => {
  const token = useRouteLoaderData("root");
  const userRedux = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      setUser(userRedux);
    }
  }, [token, userRedux]);

  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L">(
    product.details.sizes[0].size
  );

  const handleOnAddProduct = async () => {
    if (user) {
      const response = await fetch(
        "http://localhost:5000/api/users/add_to_cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user._id,
            product_id: product._id,
            product_size: selectedSize,
          }),
        }
      );

      if (!response.ok)
        throw new Response("Error while inserting product.", {
          status: 500,
        });

      const selectedProduct = product.details.sizes.find(
        (item) => item.size === selectedSize
      );
      if (selectedProduct && response.ok) {
        dispatch(
          userActions.addToCart({
            size: selectedSize,
            price: selectedProduct.price,
            originalProduct: product,
          })
        );
      }

      const resData = await response.json();
    }
  };

  const handleOnChangeSelectedSize = (size: "S" | "M" | "L") => {
    setSelectedSize(size);
  };

  const calculatePrize = () => {
    const item = product.details.sizes.find(
      (item) => item.size === selectedSize
    );

    return item?.price;
  };

  return (
    <section className="container menu__drink">
      <Stack direction="horizontal" gap={5}>
        <img src={`/images/menu/${product.image}`} />
        <Stack direction="vertical" gap={4} className="content">
          <Stack>
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
          </Stack>
          <Stack className="select-blocks" direction="horizontal" gap={3}>
            <p>Sizes:</p>
            {product.details.sizes.map((size) => (
              <button
                key={size.size}
                className={
                  selectedSize === size.size
                    ? "active info-block"
                    : "info-block"
                }
                onClick={() => handleOnChangeSelectedSize(size.size)}
              >
                {size.size}
              </button>
            ))}
          </Stack>
          <table>
            <tbody>
              <tr>
                <td>Origin</td>
                <td>{product.details.origin}</td>
              </tr>
              <tr>
                <td>Caffeine Content</td>
                <td>{product.details.caffeineContent}</td>
              </tr>
              <tr>
                <td>Roast level</td>
                <td>{product.details.roastLevel}</td>
              </tr>
            </tbody>
          </table>
          <p className="heading">${calculatePrize()}</p>
          {token && user ? (
            <>
              <button className="cta-button" onClick={handleOnAddProduct}>
                Add To Cart
              </button>
            </>
          ) : (
            <p style={{ textAlign: "center", color: "red" }}>
              Login to manipulate products inside your cart
            </p>
          )}
        </Stack>
      </Stack>
    </section>
  );
};

export default DrinkDetails;
