import "./TaskReport.css";
import {useState} from "react";
import {TaskStatus} from "../../../enums/TaskStatus";
import type {ApiGenericResponse} from "../../../dto/ApiGenericResponse";
import * as TaskService from "../../../service/TaskService";

const TaskReport = (props) => {
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [processStatus, setProcessStatus] = useState({
        error: false,
        respond: false,
        started: false
    });
    const allTaskStatus = () => {
        return Object.keys(TaskStatus).filter(status => typeof status !== 'number')
    }
    const closeForm = () => {
        props.closeForm(true);
    }

    const sendTasksReport = (event) => {
        event.preventDefault();
        setProcessStatus((prevState) => ({
            ...prevState,
            started: true
        }))
        const tasksReportResponse = async () => {
            try {
                const data = await TaskService.sendTaskReports(selectedStatus === "ALL" ? null : selectedStatus);
                console.log('Fetched project list:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        tasksReportResponse().then((response: ApiGenericResponse) => {
            if(response.responseCode===200){
                setProcessStatus((prevState) => ({
                    ...prevState,
                    respond: true
                }))
                setTimeout(() => {
                    closeForm()
                }, 1500);
            }else{
                setProcessStatus((prevState) => ({
                    ...prevState,
                    respond: true,
                    error: true
                }))
            }
        });
    }
    return (
        <div className="modal" id="taskReport" tabIndex="-1" role="dialog">
            <div className="row" style={{marginTop: "20px"}}>
                {processStatus.respond && processStatus.error &&
                    <div>
                        <div className="alert alert-danger">
                            Failed to send tasks report
                        </div>
                    </div>
                }
                {!processStatus.started &&
                    <div>
                        <div className="alert alert-info">
                            Filter by task status
                        </div>
                    </div>
                }
                {processStatus.started && !processStatus.respond &&
                    <div>
                        <div className="alert alert-primary">
                            Sending...
                        </div>
                    </div>
                }
                {processStatus.respond && !processStatus.error &&
                    <div>
                        <div className="alert alert-success">
                            Task reports sent successfully
                        </div>
                    </div>
                }
            </div>

            <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                <form onSubmit={sendTasksReport}>
                    <fieldset>
                        <div className="form-group">
                            <div className="mb-3">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => {
                                        setSelectedStatus(e.target.value)
                                    }}
                                    id="statusSelect"
                                    className="form-select"
                                    required
                                >
                                    <option value="ALL">
                                        ALL
                                    </option>
                                    {allTaskStatus().map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <button type="submit" className="btn btn-lg btn-success btn-block">Send</button>
                                <button type="button" className="btn btn-lg btn-danger btn-block"
                                        onClick={closeForm}>Close
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
export default TaskReport;