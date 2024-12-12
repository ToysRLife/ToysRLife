//import styles from "styles/Card.module.scss";
import { Link } from "react-router-dom";
import slugify from "slugify";
import styles from "styles/Card2.scss";
//import {card, cardBlue, productImage, productInfo, price, btn, buyBtn, fav, svg} from "styles/Card2.scss"
import AddToBasketBtn from "components/AddToBasketBtn";

const Card2 = ({ product }) => {
  return (
    <div className="card">
      <Link
        to={`/product/${slugify(product.title, {
          lower: true,
          strict: true,
        })}-${product.id}`}
      >
        <div className={styles.productImage}>
          <img src="https://i.ibb.co/bvJCsCv/shopBG.jpg" alt={product.title} />
        </div>
        <div className={styles.productInfo}>
          <h2>{product.title}</h2>
          <div className={styles.price}>
            <s>MRP {product.price.toFixed(2) * 3} </s>
          </div>
          <div className={styles.price}>
            Offer Price {product.price.toFixed(2)}
          </div>
        </div>
      </Link>
      <div className="btn">
        <AddToBasketBtn data={product} />
      </div>
    </div>
  );
};

export default Card;
