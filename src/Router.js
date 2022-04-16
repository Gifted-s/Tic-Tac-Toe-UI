import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';

function AppRoute () {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} exact />
                <Route path="/opponent/:gameId" element={<Home/>} exact />
            </Routes>
        </BrowserRouter>
  );
}

export default AppRoute;
