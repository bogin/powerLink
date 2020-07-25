import '../style/index.css';
import React, { useContext } from 'react';
import { TeamProfileContext } from "../context/teamProfile";
import { AppContext } from '../context/teams'


const TeamProfileComponent = (props) => {
    const { state } = useContext(AppContext);
    let { isLoaded, teams } = state;

    const { teamProfileState, setStateForTeamProfile } = useContext(TeamProfileContext)

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        setStateForTeamProfile(props.match.params.teamId, teams)
        const { team } = teamProfileState;
        const imgStyle = {
            width: '52px'
        };
        return (
            <div>
                <h1>
                    {team.fullName}
                    <img style={imgStyle} src={team.wikipediaLogoUrl} alt="" />
                </h1>
                <h3>Founded at : {team.founded}</h3>
                <h3>Team Address : {team.address}</h3>
                <h3><a href={team.website} target="_blank" rel="noopener noreferrer">jump to website</a></h3>
                <TeamPlayers />
            </div>
        );
    }
}

const TeamPlayers = () => {
    const { teamProfileState } = useContext(TeamProfileContext);
    const { players } = teamProfileState;

    return (
        <div>
            <table id='players'>
                <tbody>
                    <TeamPlayersHeader />
                    {players.map((player, index) => (
                        <TeamPlayer player={player} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const TeamPlayer = (props, key) => {

    const { name, number, photoUrl } = props.player;

    return (
        <tr key={key}>
            <td>{name}</td>
            <td>{number}</td>
            <td>
                <img src={photoUrl} alt="" />
            </td>
        </tr>
    )
}

const TeamPlayersHeader = () => {
    const { teamProfileState } = useContext(TeamProfileContext);
    const { playersTableHeaders } = teamProfileState;

    return (
        <tr>
            {
                playersTableHeaders
                    .map((key, index) => {
                        return (
                            <th key={index}>
                                {key.toUpperCase()}
                            </th>
                        )
                    })
            }
        </tr>
    )
}

export default TeamProfileComponent