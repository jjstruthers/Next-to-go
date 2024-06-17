export function filter(allRaces,type) {
    
let trimmedRaces = trimTime(allRaces);

  if(type =="greyhounds"){
    document.getElementById("typeOfRace").innerHTML = "Greyhounds";
    trimmedRaces = Object.keys(trimmedRaces).filter(objKey =>
    (trimmedRaces[objKey].category_id == '9daef0d7-bf3c-4f50-921d-8e818c60fe61' )).reduce((newObj, key) =>
      {
        newObj[key] = trimmedRaces[key];
        return newObj;
      }, {});
  return trimmedRaces;

  } else if (type=="horses") {
    document.getElementById("typeOfRace").innerHTML = "Horse Racing";
    trimmedRaces = Object.keys(trimmedRaces).filter(objKey =>
    (trimmedRaces[objKey].category_id == '4a2788f8-e825-4d36-9894-efd4baf1cfae' )).reduce((newObj, key) =>
      {
          newObj[key] = trimmedRaces[key];
          return newObj;
    }, {});
  return trimmedRaces;

  }else if (type=="harness"){
    document.getElementById("typeOfRace").innerHTML = "Harness";
    console.log('Original Object: ', trimmedRaces);
    trimmedRaces = Object.keys(trimmedRaces).filter(objKey =>
    (trimmedRaces[objKey].category_id == '161d9be2-e909-4326-8c2c-35ed71fb460b' )).reduce((newObj, key) =>
      {
          newObj[key] = trimmedRaces[key];
          return newObj;
      }, {});
    return trimmedRaces;
  }else {
    document.getElementById("typeOfRace").innerHTML = "All";
    return trimmedRaces;
  }
}





  export function orderByTime(races) {
    const racesArray = Object.keys(races).map(key => ({
      key: key,
      ...races[key]
    }));
    racesArray.sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds);
    const sortedRaces = racesArray.reduce((acc, race) => {
      acc[race.key] = race;
      return acc;
    }, {});
    return sortedRaces;
  }
  
 

function trimTime(allRaces){
    allRaces = Object.keys(allRaces).filter(objKey =>
    (is60SecondsPast(allRaces[objKey].advertised_start.seconds) )).reduce((newObj, key) =>
        {
            newObj[key] = allRaces[key];
            return newObj;
        }, {}
    );
    return allRaces;
}


function is60SecondsPast(unixTimestamp) {
    const currentTimestamp = Math.floor(Date.now() / 1000); 
    const timestampDifference = currentTimestamp - unixTimestamp; 
    return timestampDifference < 59; 
}


export function getTimeUntilUnixTimestamp(unixTimestamp) {
    let currentTimeMillis = Date.now();
    let timestampMillis = unixTimestamp * 1000;
    let differenceMillis = timestampMillis - currentTimeMillis;
    let differenceSeconds = Math.floor(differenceMillis / 1000);
    let days = Math.floor(differenceSeconds / (3600 * 24));
    let hours = Math.floor((differenceSeconds % (3600 * 24)) / 3600);
    let minutes = Math.floor((differenceSeconds % 3600) / 60);
    let seconds = differenceSeconds % 60;
    let timeUntil = "";
    if (days > 0) {
        timeUntil += `${days} day${days !== 1 ? 's' : ''}, `;
    }
    if (hours > 0 || days > 0) {
        timeUntil += `${hours} hour${hours !== 1 ? 's' : ''}, `;
    }
    if (minutes > 0 || hours > 0 || days > 0) {
        timeUntil += `${minutes} minute${minutes !== 1 ? 's' : ''}, `;
    }
    timeUntil += `${seconds} second${seconds !== 1 ? 's' : ''}`;
    return timeUntil;
}

