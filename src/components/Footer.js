import styles from "styles/Footer.module.scss";
import GetIcon from "components/GetIcon";
import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {

  return (
    <footer className={styles.footer}>
      <div>
        <GetIcon icon="BsFillHeartFill" size={22} color="#da0037" />
        <p>&copy; 2024 Indian Toy Shop. All rights reserved.</p>
        <Link to={`/ToysRLife/contact`}>Contact Us</Link>
      </div>
    </footer>
  );
};

export default Footer;
