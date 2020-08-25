const https = require('https');

async function getTotalGoals(team, year) {
    const totalPages = await getPages(team, year);
    const teamOneTotalGoals = await getTeamOneTotalGoals(team, year, totalPages);
    const teamTwoTotalGoals = await getTeamTwoTotalGoals(team, year, totalPages);

    return teamOneTotalGoals + teamTwoTotalGoals;
}

async function getPages(team, year){
    return new Promise(resolve => {
        https.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}`, response => {
            response.on('data', async data => {
                const {total_pages} = JSON.parse(data);
                resolve(total_pages);
            });
        });
    });
};

async function getTeamOneTotalGoals(team, year, pages){
    return new Promise(resolve => {
        let totalGoals = 0;
        for(let i = 0; i < pages; i++){
            https.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}&page=${i + 1}`, response => {
            response.on('data', data => {
                    const parsedData = JSON.parse(data).data;
                    for(let j = 0; j < parsedData.length; j++){
                        totalGoals += parseInt(parsedData[j].team1goals);
                        if(j === parsedData.length - 1 && i === pages - 1){
                            resolve(totalGoals);
                        }
                    }
                })
            })
        }
    })
}

async function getTeamTwoTotalGoals(team, year, pages){
    return new Promise(resolve => {
        let totalGoals = 0;
        for(let i = 0; i < pages; i++){
            https.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team2=${team}&page=${i + 1}`, response => {
            response.on('data', data => {
                    const parsedData = JSON.parse(data).data;
                    for(let j = 0; j < parsedData.length; j++){
                        totalGoals += parseInt(parsedData[j].team2goals);
                        if(j === parsedData.length - 1 && i === pages - 1){
                            resolve(totalGoals);
                        }
                    }
                })
            })
        }
    })
}

const response = getTotalGoals('Barcelona', 2011);

response.then(resp => console.log(resp));