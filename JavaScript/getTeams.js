const axios = require('axios');

const getTeams = async (year, k) => {
    try {
        let teamMatchCount = await getTeamMatchCount(year);
        const teamsWithAboveKGamesPlayed = [];

        for(const teamName in teamMatchCount){
            
            if(teamMatchCount[teamName] >= k){
                teamsWithAboveKGamesPlayed.push({team : teamName, matchesPlayed : teamMatchCount[teamName]});
            }
        }
        return teamsWithAboveKGamesPlayed;

    } catch (error) {
        
    }
};

const getTeamMatchCount = async (year) => {
    let teamMatchCount = {};


    return new Promise(async (resolve, reject) => {
        try {
            const url = `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}`;    
            const {data} = await axios.get(url);
            const {total_pages} = data;
    
            for(let i = 0; i < total_pages; i++){
                const pageUrl = `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${i + 1}`;
                const pageResponse = await axios.get(pageUrl);
                const pageData = pageResponse.data.data;
    
                for (let j = 0; j < pageData.length; j++){
                    const gameInfo = pageData[j];
                    teamMatchCount[gameInfo.team1] = teamMatchCount[gameInfo.team1] ? teamMatchCount[gameInfo.team1] + 1 : 1;
                    teamMatchCount[gameInfo.team2] = teamMatchCount[gameInfo.team2] ? teamMatchCount[gameInfo.team2] + 1 : 1;
                }
            }

            return resolve(teamMatchCount);
        } catch (error) {
            console.log(error);
        }
    })
};

const result = async () => {
    const response = await getTeams(2015, 13);
    console.log(response);
    return response;
}

result();