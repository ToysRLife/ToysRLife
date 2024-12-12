import styles from "styles/AddToBasketBtn.module.scss";
import { BasketContext } from "context/BasketContext";
import { useContext } from "react";
import GetIcon from "components/GetIcon";
import { toast } from "react-toastify";

const AddToBasketBtn = ({ data: product, className }) => {
  const { basketItems, setBasketItems, setBasketTotal, currentQuantity } =
    useContext(BasketContext);
  toast.configure();

  const addToBasket = (product) => {
    let arr = [...basketItems];
    arr.image = product.img3;
    let filtered = basketItems.filter((item) => item.id === product.id);
    if (filtered.length > 0) {
      filtered[0].quantity += 1;
      arr[arr.indexOf(filtered[0])] = filtered[0];
      setBasketItems(arr);
      toast(product.title + " added to cart!");
    } else {
      setBasketItems((oldState) => [
        ...oldState,
        {
          id: product.id,
          title: product.title,
          image: product.img3,
          price: product.price,
          quantity: currentQuantity,
        },
      ]);
      toast(product.title + " added to cart!");
    }

    setBasketTotal(
      (oldTotal) => (oldTotal += product.price * (currentQuantity || 1))
    );
  };

  return (
    <button
      className={`${styles.addToBasket} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        addToBasket(product);
      }}
    >
      <GetIcon icon="BsFillCartPlusFill" size={18} /> Add to Basket
    </button>
  );
};

export default AddToBasketBtn;
