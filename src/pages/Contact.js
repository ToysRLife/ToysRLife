import "styles/contact.css";
import { BasketContext } from "context/BasketContext";
import { useContext, useRef } from "react";

const Contact = () => {
  const {
    basketIsOpen,
    setBasketIsOpen,
    basketItems,
    basketTotal: _basketTotal,
  } = useContext(BasketContext);
  const container = useRef();

  return (
    <section id="contact">
      <div className="contact container">
        <form action="https://formspree.io/f/mbljewbe" method="POST">
          <div className="form">
            <div className="form-txt">
              <h4>INFORMATION</h4>
              <h1>Contact Us</h1>
              <span>
                Thanks for showing us your interest, one of our executive will
                reach out to you.
              </span>
              <h3>Please submit your details.</h3>
              <p>With Love</p>
              <h3>India</h3>
            </div>
            <div className="form-details">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter your Mobile number"
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
              <textarea
                name="message"
                id="message"
                cols="52"
                rows="7"
                defaultValue={
                  "Interested in following items :\n" +
                  basketItems.map(
                    (item) =>
                      item.title + " " + item.quantity + " " + item.price + "\n"
                  )
                }
                required
              ></textarea>
              <button>SEND MESSAGE</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
