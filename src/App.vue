<template>
  <h1>Next to go</h1>
  <div>
    <h2 id=typeOfRace>All</h2>
    <ul>
      <li class ="race"><div id="r1">{{r1Num}}: {{race1}}</div><div>Time: {{r1Time}}</div></li>
      <li class ="race"><div id="r2">{{r2Num}}: {{race2}}</div><div>Time: {{r2Time}}</div></li>
      <li class ="race"><div id="r3">{{r3Num}}: {{race3}}</div><div>Time: {{r3Time}}</div></li>
      <li class ="race"><div id="r4">{{r4Num}}: {{race4}}</div><div>Time: {{r4Time}}</div></li>
      <li class ="race"><div id="r5">{{r5Num}}: {{race5}}</div><div>Time: {{r5Time}}</div></li>
    </ul>
    <button @click="getAll">All</button>
    <button @click="getGreyhounds">Greyhound</button>
    <button @click="getHarness">Harness</button>
    <button @click="getHorses">Horse</button>
  </div>
</template>



<script>
import { filter,getTimeUntilUnixTimestamp,orderByTime } from './js/functions.js';


export default {
  data() {
    return {
      race1: "Race 1",
      race2: "Race 2",
      race3: "Race 3",
      race4: "Race 4",
      race5: "Race 5",
      r1Num: "N/A",
      r2Num: "N/A",
      r3Num: "N/A",
      r4Num: "N/A",
      r5Num: "N/A",
      r1Time: "N/A",
      r2Time: "N/A",
      r3Time: "N/A",
      r4Time: "N/A",
      r5Time: "N/A",
      selected: "all"
    }
  },

  methods: {
    getData(selected) {
      console.log(selected+" Has been selected1 123");
      fetch('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=50')
      .then(response => {
        if (!response.ok) {
         throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(raceData => {
      let obj = raceData.data.race_summaries;
      let allObj = filter(obj,selected);
      let sortedRaces= orderByTime(allObj);
      let keys = Object.keys(sortedRaces);
      let key1 = keys[0];
      let r1 = obj[key1];
      let key2 = keys[1];
      let r2 = obj[key2];
      let key3 = keys[2];
      let r3 = obj[key3];
      let key4 = keys[3];
      let r4 = obj[key4];
      let key5 = keys[4];
      let r5 = obj[key5];

      this.race1 = r1 !== undefined ? r1.race_name : "Race 1";
      this.r1Time = r1 !== undefined ? getTimeUntilUnixTimestamp(r1.advertised_start.seconds) : "N/A";
      this.r1Num = r1 !== undefined ? r1.race_number : "N/A";

      this.race2 = r2 !== undefined ? r2.race_name : "Race 2";
      this.r2Time = r2 !== undefined ? getTimeUntilUnixTimestamp(r2.advertised_start.seconds) : "N/A";
      this.r2Num = r2 !== undefined ? r2.race_number : "N/A";

      this.race3 = r3 !== undefined ? r3.race_name : "Race 3";
      this.r3Time = r3 !== undefined ? getTimeUntilUnixTimestamp(r3.advertised_start.seconds) : "N/A";
      this.r3Num = r3 !== undefined ? r3.race_number : "N/A";

      this.race4 = r4 !== undefined ? r4.race_name : "Race 4";
      this.r4Time = r4 !== undefined ? getTimeUntilUnixTimestamp(r4.advertised_start.seconds) : "N/A";
      this.r4Num = r4 !== undefined ? r4.race_number : "N/A";
      
      this.race5 = r5 !== undefined ? r5.race_name : "Race 5";
      this.r5Time = r5 !== undefined ? getTimeUntilUnixTimestamp(r5.advertised_start.seconds) : "N/A";
      this.r5Num = r5 !== undefined ? r5.race_number : "N/A";

      })
      .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  },
  
    getHarness(){
      this.selected = "harness"
      this.getData(this.selected)
    },

    getGreyhounds(){
      this.selected = "greyhounds"
      this.getData(this.selected)
    },

    getAll(){
      this.selected = "all"
      this.getData(this.selected)
    },

    getHorses(){
      this.selected = "horses"
      this.getData(this.selected)
    }
  },

  created() {
    this.interval = setInterval(() => {
      console.log("Getting Data every second"+ this.selected);
      this.getData(this.selected);
    }, 500);
  }

}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  display: grid;
  place-items: center;
  
}

ul {
  
  padding: 0;
  margin: 0;
  list-style-type: none;
  width: 500px;
}

button {
  background-color: #EEEEEE;
   border-radius: 5px;
   width: 125px;
   height: 60px;

}

.race {
  background-color: #DDDDDD;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
}
</style>
