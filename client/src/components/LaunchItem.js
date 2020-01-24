import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

export default function LaunchItem({launch: { flight_number, mission_name, launch_date_local, launch_success}}) {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-9">
                    <h4>
                        Mission:{ " " }
                        <span className={classNames({
                            'text-success': launch_success,
                            'text-danger': !launch_success
                        })}>
                            { mission_name }
                        </span>
                    </h4>
                    <h6>Date: { monthNames[new Date(launch_date_local).getMonth()] 
                    + " " + ordinal_suffix_of(new Date(launch_date_local).getDay()) 
                    + " " + new Date(launch_date_local).getFullYear()} </h6>
                </div>
                <div className="col-md-3">
                    <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
                        Launch Details
                    </Link>
                </div>
            </div>
        </div>
    )
}