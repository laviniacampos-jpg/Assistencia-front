import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: JSX.Element;
}

/**
 * Protege uma rota privada.
 * Se o usuário estiver autenticado, renderiza o elemento.
 * Caso contrário, redireciona para /login.
 */
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    const isAuthenticated = !!localStorage.getItem('isAuth');

    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;