import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from './utils/useAuth';

import Home from './pages/Home/home';
import Login from "./pages/Auth/login";
import Signup from './pages/Auth/signup';
import Catalogo from './pages/Catalogo/catalogo'
import ProductView from "./pages/ProductView/productview";

import Header from "./components/header";

function RotasApp(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>

                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/catalogo/:slug" element={<Catalogo/>}/>
                        <Route path="/productview" element={<ProductView/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

function Layout(){
    return(
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}
export default RotasApp;