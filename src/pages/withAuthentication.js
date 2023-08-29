import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";

const withAuthentication = (WrappedComponent) => {
  const WithAuthenticationWrapper = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(
        (authUser) => {
          if (authUser) {
            setUser(authUser);
          } else {
            setUser(null);
          }
          setLoading(false);
        },
        (error) => {
          // Handle error here (display error message, log, etc.)
          setLoading(false);
        }
      );

      return () => {
        unsubscribe();
      };
    }, []); // No dependencies, so it only runs once

    useEffect(() => {
      if (!loading && !user) {
        navigate('/login', { replace: true, state: { from: location } });
      }
    }, [loading, user, navigate, location]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthenticationWrapper;
};

export default withAuthentication;
