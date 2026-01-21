import { useAuth } from "react-oidc-context"

function Home() {
    const auth = useAuth();

    return (
        <>
        <div className="container">
            <h1>Welcome!</h1>
            <h2>Noise Measurement System</h2>
            {auth.isAuthenticated &&
            <>
                <h3>Hello, {auth.user?.profile.email}</h3>
                <p>Monitor and configure your IoT devices</p>
            </>
            }
            {!auth.isAuthenticated &&
                <p>Log in to pair, monitor and configure your IoT device</p>
            }
        </div>
        </>
    )
}

export default Home