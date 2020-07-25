import React, { createContext, useState } from "react";

const TeamProfileContext = createContext('');
const TeamProfileContextProvider = ({ children }) => {
    let [teamProfileState] = useState({
        team: null,
        players: null,
        playersTableHeaders: ['name', 'number', 'photoUrl'],
    });

    const setStateForTeamProfile = (teamId, teams) => {
        const [team] = teams.filter(x => `${x.id}` === teamId)
        const players = team.players.map(x => {
            return {
                name: x.CommonName,
                number: x.Jersey,
                photoUrl: x.PhotoUrl
            }
        });
        teamProfileState.players = players;
        teamProfileState.team = team;
    }

    const contextObject = {
        teamProfileState,
        setStateForTeamProfile,
    }

    return (
        <TeamProfileContext.Provider value={contextObject}>
            {children}
        </TeamProfileContext.Provider>
    );
};


export { TeamProfileContext, TeamProfileContextProvider };
