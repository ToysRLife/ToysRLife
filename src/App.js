import styles from "styles/App.module.scss";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import clsx from "clsx";

// PAGES
import Home from "pages/Home";
import Detail from "pages/Detail";
import Category from "pages/Category";
import Contact from "pages/Contact";

// COMPONENTS
import Header from "components/Header";
import BasketSidebar from "components/BasketSidebar";
import Footer from "components/Footer";
import MobileBottomNav from "components/MobileBottomNav";

// HOOKS
import useMobileDetect from "hooks/useMobileDetect";

// CONTEXT
import BasketContextProvider from "context/BasketContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const device = useMobileDetect();

  return (
    <Router>
      <BasketContextProvider>
        <div
          className={clsx(
            device.type === "mobile" && styles.paddingForMobile,
            styles.container
          )}
        >
          <ToastContainer position="top-center" autoClose={1000} />
          <Header />
          <main className={styles.main}>
            <Switch>
              <Route path="/ToysRLife/product/:slug">
                <Detail />
              </Route>
              <Route path="/ToysRLife/category/:slug">
                <Category />
              </Route>
              <Route path="/ToysRLife/contact/">
                <Contact />
              </Route>
              <Route path="/ToysRLife" exact>
                <Home />
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
        <BasketSidebar />
        {device.type === "mobile" && <MobileBottomNav />}
      </BasketContextProvider>
    </Router>
  );
};

export default App;
