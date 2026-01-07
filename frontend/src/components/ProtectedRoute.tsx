import { useLocation } from 'react-router-dom';
import React from 'react';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        // Instead of navigating away, we render the LoginModal.
        // This keeps the user on the same URL context.
        return <LoginModal />;
    }

    return children;
};

export default ProtectedRoute;
