import { useAuth } from "react-oidc-context";

function Login() {
    const auth = useAuth();

    const signOutRedirect = () => {
        auth.removeUser();
        const clientId = "70bjsk5urnr8c71at6o4o66ccg";
        const logoutUri = "http://localhost:5173/";
        const cognitoDomain = "https://eu-north-1tb65z7qev.auth.eu-north-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div className="container">
                <h2> Hello, {auth.user?.profile.email}! </h2>
                {/* <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre> */}

                <button onClick={signOutRedirect}>Sign out</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Log in</h1>
            <p>Log in or register via Amazon AWS</p>
            <button onClick={() => auth.signinRedirect()}>Sign in</button> <br />
        </div>
    );
}

export default Login