let details = {
    name: 'Alex',
    age: 30,
    country: 'Canada'
};

export function filterTest() {

    console.log('Original Object: ', details);
  details = Object.keys(details).filter(objKey =>
      objKey !== 'age').reduce((newObj, key) =>
      {
          newObj[key] = details[key];
          return newObj;
      }, {}
  );
  console.log(details);
  }




export function myFunction() {
    console.log("Hello from myFunction!");
  }