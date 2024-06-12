import React, { useContext } from 'react';
import Header from '../user/component/Header/Header';
import Home from '../user/container/Home/Home';
import Footer from '../user/component/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Shop from '../user/container/Shop/Shop';
import ShopDetails from '../user/container/ShopDetails/ShopDetails';
import PrivateRoute from './PrivateRoute';
import Contact from '../user/container/Contact/Contact';
import Review from '../user/container/Review/Review';
import Cart from '../user/container/Cart/Cart';
import { ThemeContext } from '../Context/ThemeContext';

function UserRouter(props) {
    const theme = useContext(ThemeContext)
    console.log(theme);
    return (
        <div className={theme.theme}>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route element={<PrivateRoute />}>
                    <Route exact path="/Shop" element={<Shop />} />
                    <Route exact path="/Shopdetails/:id" element={<ShopDetails />} />
                </Route>
                <Route exact path="/cart" element={<Cart />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/review' element={<Review />} />

            </Routes>
            <Footer />
        </div>
    );
}

export default UserRouter;