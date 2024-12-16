import styles from "styles/Header.module.scss";
import { Link } from "react-router-dom";
import GetIcon from "components/GetIcon";
import clsx from "clsx";
import mobstyle from "styles/MobileBottomNav.module.scss";
import useMakeRequest from "hooks/useMakeRequest";
import { BasketContext } from "context/BasketContext";
import { useContext } from "react";

const Header = () => {
  const result = useMakeRequest("https://products/categories");
  const { basketItems, setBasketIsOpen } = useContext(BasketContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
      <img alt="Toys R Life" src={process.env.PUBLIC_URL + "/logo192.png"} margin="1rem" width="50" height="50" />
        <Link to="/ToysRLife/">
          <h2>Toys R Life</h2>
        </Link>
      </div>
      
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <ul className={mobstyle.mobileCategoriesMenu}>
            <li>
            <Link to={`/ToysRLife/badge/Trending`} className={styles.a}>
            <img alt="Trending" src="https://icons.iconarchive.com/icons/fa-team/fontawesome/128/FontAwesome-Arrow-Trend-Up-icon.png" width="50" height="50" />
            </Link>
            </li>
            <li>
            <Link to={`/ToysRLife/badge/Hot`} className={styles.a}>
            <img alt="Hot" src="https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/128/42697-fire-icon.png" width="50" height="50" />
            </Link>
            </li>
            {result.data ? (
                result.data.map((cat, index) => (
                    
                   <li className={styles.item}>
                    <Link
                    to={`/ToysRLife/category/${cat}`}
                    className={styles.a}
                  >
                    {cat}
                  </Link>
                  </li>
                  ))
                ) : (
                  <div>{result.error}</div>
                )}

            <li>
              <Link to={`/ToysRLife/contact`} className={styles.a}>Contact Us</Link>
            </li>
            <li>
              <Link
                to="/ToysRLife/"
                className={clsx(styles.basketBtn, styles.a)}
                onClick={(e) => {
                  e.preventDefault();
                  setBasketIsOpen((oldState) => !oldState);
                }}
              >
                <GetIcon icon="BsCart4" size={25} color="#ffffff" />
                {basketItems.length > 0 && (
                  <span className={styles.basketLength}>
                    {" "}
                    {basketItems.length}{" "}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
