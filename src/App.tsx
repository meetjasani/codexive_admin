import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import { LastLocationProvider } from 'react-router-last-location';
import { Provider } from 'react-redux'
import store from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <LastLocationProvider>
            <Routes />

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover theme='colored' />
          </LastLocationProvider>
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
