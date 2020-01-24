import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number){
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local
            details
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
            links {
                mission_patch
                presskit
                flickr_images
            }
        }
    }
`;

export class Launch extends Component{
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);

        return (
            <Fragment>
                <Query query={ LAUNCH_QUERY } variables={{ flight_number }}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return <h4>Loading...</h4>;
                            if (error) console.log(error);
                            
                            const { mission_name, flight_number, launch_year, launch_success, details,
                                rocket: {rocket_id, rocket_name, rocket_type},
                                links: {mission_patch, presskit, flickr_images}} = data.launch;
                            
                            let presskit_pdf = null;
                            if (presskit) {
                                presskit_pdf = 
                                <div>
                                    <h4 className="mb-3">PressKit</h4>
                                    <iframe 
                                        title="presskit"
                                        src={presskit} 
                                        width="100%" 
                                        height="500px"
                                    />
                                    <hr/>
                                </div>
                            }

                            let flickr_images_gallery = null;
                            let flickr_images_list = [];
                            if (flickr_images.length > 0) {
                                console.log(flickr_images)
                                flickr_images.forEach(flickr_image_link => {
                                    flickr_images_list.push(
                                        <div className="slide" key={flickr_image_link}>
                                            <img 
                                                src={flickr_image_link} 
                                                alt="Not Found" 
                                                style={{ 
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                                paddingBottom: 20,
                                                height: 200, 
                                                }}
                                            />
                                        </div>
                                    )
                                });
                                flickr_images_gallery = 
                                <div>
                                    <h4 className="mb-3">Images</h4>
                                    <div className="carousel">
                                        {flickr_images_list}
                                    </div>
                                    <hr/>
                                </div>
                            }

                            return(
                                <div>
                                    <h1 className="display-4 my-3">
                                        <span className="text-dark">
                                            Mission: {' '}
                                        </span>
                                        {mission_name}
                                    </h1>
                                    <div>
                                        <img 
                                            src={mission_patch} 
                                            alt="No Mission Patch Available" 
                                            style={{ 
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            paddingBottom: 20,
                                            width: 200, 
                                            display: 'block',
                                            }}
                                        />
                                    </div>
                                    <h4 className="mb-3">General Details</h4>
                                    <h6>{ details }</h6>
                                    <hr/>
                                    <h4 className="mb-3">Launch Details</h4>
                                    <ul>
                                        <li className="list-group-item">
                                            Flight Number: {flight_number}
                                        </li>
                                        <li className="list-group-item">
                                            Launch Year: {launch_year}
                                        </li>
                                        <li className="list-group-item">
                                            Launch Successful:{' '} 
                                            <span className={classNames({
                                                'text-success': launch_success,
                                                'text-danger': !launch_success,
                                            })}>
                                                {launch_success ? 'Yes' : 'No'}
                                            </span>
                                        </li>
                                    </ul>
                                    <hr/>
                                    <h4 className="mb-3">Rocket Details</h4>
                                    <ul>
                                        <li className="list-group-item">
                                            Rocket ID: {rocket_id}
                                        </li>
                                        <li className="list-group-item">
                                            Rocket Name: {rocket_name}
                                        </li>
                                        <li className="list-group-item">
                                            Rocket Type: {rocket_type}
                                        </li>
                                    </ul>
                                    <hr/>
                                    { flickr_images_gallery }
                                    { presskit_pdf }
                                    <Link to="/" className="btn btn-secondary">
                                        Back
                                    </Link>
                                    <hr/>
                                </div>
                            )
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launch