import "./Navbar.css";

const Navbar = () => {
    const titleStyle = {
        fontSize: "x-large",
        fontWeight: "bold",
        color: "green",
    }
    const adminButtonStyle = {
        color: "#a10606",
        fontWeight: "bold",
        fontSize: 'large'
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand" style={titleStyle}>Company-Tracker</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a href="/departments" className="nav-item nav-link">Departments</a>
                    <a href="/employees" className="nav-item nav-link">Employees</a>
                    <a href="/projects" className="nav-item nav-link">Projects</a>
                    <a href="/tasks" className="nav-item nav-link">Tasks</a>
                    <a href="/admins" className="nav-item nav-link" style={adminButtonStyle}>Admins</a>
                </div>
            </div>
            <a href="/true" className="btn btn-primary mb-lg-auto update-button">Update my data</a>
            <a href="/true" className="btn btn-danger mb-lg-auto logout-button">Logout</a>
        </nav>
    )
        ;
}
export default Navbar;