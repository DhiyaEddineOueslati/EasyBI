import React from 'react';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';

function Home() {

        const { loginWithRedirect, isAuthenticated } = useAuth0();
        return (
            !isAuthenticated && (
                <button onClick={() => loginWithRedirect()}>
                    Sign In
                </button>
            ))

}

export default Home;
