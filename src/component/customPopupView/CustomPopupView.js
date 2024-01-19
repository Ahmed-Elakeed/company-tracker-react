import "./CustomPopupView.css";

const CustomPopupView = (props) => {
    const closePopup = (event) => {
        event.preventDefault();
        props.closePopup();
    }
    return (
        <div
            className="modal"
            id="viewTable"
            style={{
                width: props.viewProps.width,
                height: props.viewProps.height
            }}
            tabIndex="-1"
            role="dialog">
            <div style={{width: "100%", marginBottom: "5%"}}>
                <a href="/true" className="btn btn-danger" onClick={closePopup}
                   style={{float: "right", margin: "auto"}}>Close</a>
            </div>
            <table style={{width: "100%"}}>
                <thead className="thead-dark">
                <tr>
                    {props.viewProps.headers.map((header) => (
                        <th key={header} style={{backgroundColor: "#05726e", color: "white"}} scope="col">{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {props.viewProps.data.map((record) => (
                    <tr key={record}>
                        {Object.values(record).map((value) => (
                            <td key={value} style={{backgroundColor: "white", color: "black"}}>{value}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}
export default CustomPopupView;