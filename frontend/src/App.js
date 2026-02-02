import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Context from './context'; // Context ইমপোর্ট মাস্ট

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        dispatch(setUserDetails(dataResponse.data));
      }
    } catch (error) {
      console.log("Error details:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include'
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        setCartProductCount(dataResponse.data.count);
      }
    } catch (error) {
      console.log("Error count:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    // এই Context.Provider টাই তোর এরর ফিক্স করবে
    <Context.Provider value={{
      fetchUserDetails,
      fetchUserAddToCart,
      cartProductCount
    }}>
      <ToastContainer position='top-center' />
      <Header />
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;