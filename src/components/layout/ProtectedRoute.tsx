/**
 * ProtectedRoute Component
 * Wrapper for routes that require authentication
 * Redirects to welcome page if user is not authenticated
 */
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts';

interface ProtectedRouteProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

/**
 * Protected route component that checks authentication
 * @param redirectTo - Path to redirect if not authenticated (default: '/')
 * @param children - Optional children to render instead of Outlet
 */
export const ProtectedRoute = ({ redirectTo = '/', children }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  // Redirect to welcome page if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render children if provided, otherwise render Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};
