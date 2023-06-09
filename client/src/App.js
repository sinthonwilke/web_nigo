import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import WishListPage from './pages/WishListPage';
import Favorite from './pages/FavoritePage';
import RegisterPage from './pages/RegisterPage';
import isAuthenticated from './services/isAuthenticated';
import isRoleAdmin from './services/isRoleAdmin';
import logout from './services/logout';
import './App.css';
import Layout from './layout/layout';
import ProfilePage from './pages/ProfilePage';
import FeedbackPage from './pages/FeedbackPage';
import Admin from './pages/AdminPage';
import AdminGamePage from './pages/AdminGamePage';
import AdminFeedbackPage from './pages/AdminFeedbackPage';
import OtherProfilePage from './pages/OtherProfilePage';

function App() {
    const isAuth = isAuthenticated();
    const isAdmin = isRoleAdmin();

    return (
        <BrowserRouter>
            {isAuth ? (
                <Layout>
                    <Routes>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/user" element={<OtherProfilePage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/game" element={<GamePage />} />
                        <Route path="/wishlist" element={<WishListPage />} />
                        <Route path="/favorite" element={<Favorite />} />
                        <Route path="/feedback" element={<FeedbackPage />} />
                        <Route path="/logout" Component={logout} />
                        <Route path="*" element={<Navigate to="/" />} />

                        {isAdmin ? (
                            <>
                                <Route path="/admin/" element={<Admin />} />
                                <Route path="/admin/game" element={<AdminGamePage />} />
                                <Route path="/admin/feedback" element={<AdminFeedbackPage />} />
                            </>
                        ) : null}

                    </Routes>
                </Layout>
            ) : (
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
