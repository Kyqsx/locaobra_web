import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './utils/useAuth';

import Home from './pages/Home/home';
import Login from "./pages/Auth/login";
import Signup from './pages/Auth/signup';
import Catalogo from './pages/Catalogo/catalogo';
import ProductView from "./pages/ProductView/productview";
import AdminDashboard from './pages/Admin/dashboard'; 
import AdminEquipamentos from './pages/Admin/equipamentos';

import Header from "./components/header";
import Sidebar from "./components/sidebar";

function SiteLayout() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                <Outlet />
            </main>
        </>
    );
}

function AdminLayout() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '20px', backgroundColor: '#f4f7f6' }}>
                <Outlet />
            </main>
        </div>
    );
}

function ProtectedHandler({ children }) {
    const { loading } = useAuth();
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Carregando sessão...</p> 
            </div>
        );
    }
    return children;
}

function AdminRoute({ children }) {
    const { user, isAuthenticated, loading } = useAuth();
    if (loading) return null;
    if (!isAuthenticated || user?.tipo !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }
    return children;
}

function RotasApp() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route element={<ProtectedHandler><Outlet /></ProtectedHandler>}>
                        
                        <Route element={<SiteLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalogo/:slug" element={<Catalogo />} />
                            <Route path="/productview" element={<ProductView />} />
                        </Route>

                        <Route path="/admin" element={
                            <AdminRoute>
                                <AdminLayout />
                            </AdminRoute>
                        }>
                            <Route index element={<AdminDashboard />} />
                            <Route path="equipamentos" element={<AdminEquipamentos />} />   
                        </Route>

                    </Route>

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default RotasApp;