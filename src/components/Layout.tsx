import { useAuth } from "react-oidc-context"
import { Link } from "react-router"
import { Outlet } from "react-router"

function Layout() {
    const auth = useAuth();

    return (
        <>
        <div className="main-container">
            <header>
                <Link to={'/'}><h1>NOISE  MEASUREMENT  SYSTEM</h1></Link>
                <nav>
                    <div>
                        <Link to={'/'}>HOME</Link>
                        {auth.isAuthenticated && <>
                            <Link to={'/my-devices'}>MY DEVICES</Link>
                            <Link to={'/monitor-device/'}>MONITOR DEVICE</Link>
                            <Link to={'/configure-device'}>CONFIGURE DEVICE</Link>
                            <Link to={'/statistics'}>STATISTICS</Link>
                        </>
                        }
                    </div>
                    {auth.isAuthenticated && <>
                        <Link to={'#'}>Hello, {auth.user?.profile.email}</Link>
                        <Link to={'/login'}>LOGOUT</Link>
                    </>}
                    {!auth.isAuthenticated && 
                        <Link to={'/login'}>LOGIN</Link>
                    }
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>&copy; 2026 Noise Measurement System - Gawroński, Gleindek, Górski - all rights reserved</footer>
        </div>
        </>
    )
}

export default Layout