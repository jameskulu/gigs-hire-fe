import './App.css';
import { BrowserRouter, Routes, Switch, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Home from './components/pages/Home';
import Detail from './components/pages/Detail';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import VerifyEmail from './components/auth/VerifyEmail';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure();
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <div className="container mt-2">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            exact
                            path="/musicians/:id"
                            element={<Detail />}
                        />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route
                            exact
                            path="/verify-email/:token"
                            element={<VerifyEmail />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
