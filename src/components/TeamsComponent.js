import '../style/index.css';
import React, { useContext } from 'react';
import { AppContext } from "../context/teams";
import { LinkContainer } from "react-router-bootstrap";

const TeamsComponent = () => {

    const { state } = useContext(AppContext);
    const { isLoaded, teams } = state;
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <h1 id='title'>Teams Table</h1>
                <table id='teams'>
                    <tbody>
                        <Header />
                        {teams.map((team, index) => (
                            <Team team={team} key={index} />
                        ))}

                    </tbody>
                </table>
            </div>
        );
    }
}

const Header = () => {
    const { state } = useContext(AppContext);
    let { headers } = state;

    headers = Object.keys(headers)
    return (
        <tr>
            {headers
                .map((key, index) => {
                    return (
                        <th key={index}>
                            {key.toUpperCase()}
                        </th>
                    )
                })}
        </tr>
    )
}

const Team = (props, key) => {
    const { name, founded, address, id } = props.team;

    const link = String(`/teams/${id}`)
    return (
        <LinkContainer to={link} params={{ teamId: id }}>
            <tr key={key} >
                <td>{name}</td>
                <td>{founded}</td>
                <td>{address}</td>
            </tr>
        </LinkContainer>
    )
}

export default TeamsComponent;