import React, { createContext, useState, useEffect } from "react";
const https = require('https');
const API_URL = `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/1?key=88d629ff217946d58b3a6875dcb23044`
const AppContext = createContext('');
const AppContextProvider = ({ children }) => {

    let [state, setState] = useState({
        isLoaded: false,
        teams: null,
        headers: null
    });
    
    const setHeaders = headers => {
        setState(prevState => ({
            ...prevState,
            headers
        }));
    }

    const setTeams = teams => {
        setState(prevState => ({
            ...prevState,
            teams
        }));
    }

    const setIsLoaded = value => {
        setState(prevState => ({
            ...prevState,
            isLoaded: value
        }));
    }

    const contextObject = {
        state,
        setTeams,
        setHeaders,
        setIsLoaded
    }

    useEffect(() => {
        const getData = res => {
            res.setEncoding('utf8');
            let data = '';
            res.on('data', function (body) {
                data += body;
            });
            res.on('end', () => {
                processRecivedData(data)
            });
        };

        https.get(API_URL, getData)

        const teamModel = teamFromApi => {
            return {
                id: teamFromApi.TeamId,
                address: teamFromApi.Address,
                founded: teamFromApi.Founded,
                name: teamFromApi.Name,
                players: teamFromApi.Players,
                website: teamFromApi.Website,
                fullName: teamFromApi.FullName,
                wikipediaLogoUrl: teamFromApi.WikipediaLogoUrl
            }
        }
        const processRecivedData = data => {
            debugger
            data = JSON.parse(data).Teams.map(x => teamModel(x));
            setHeaders({
                name: data[0].name,
                founded: data[0].founded,
                address: data[0].address
            });
            setTeams(data);
            setIsLoaded(true);
        };

    }, []);

    return (
        <AppContext.Provider value={contextObject}>
            {children}
        </AppContext.Provider>
    );
};


export { AppContext, AppContextProvider };