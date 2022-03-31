 const taskOne = (passengers:number, shuffle:number)=>{
    //complete your work here
    
 if (passengers < 1) {
    throw "Number of passengers shouldn't be less than 1";
  }
  if (passengers === null) {
    throw "Number of passengers cannot be empty";
  }

  let boarded = [];
  let reservation = [];
  let count = 1;
  let locations = ["Abuja", "Benue", "Lagos", "Katsina", "Sambisa"];

  let numberOfPassengers = passengers - (passengers % 5);
  
  // Determine the amount of passengers to populate in the boarded list
  for (let i = 0; i < numberOfPassengers; i++) {
    let number = i % locations.length;
    boarded.push({ name: `passenger${i + 1}`, location: `${locations[number]}` });
  }

  // To get number of passenger in reservations list
  let reserve = passengers % 5;
  for (let i = 0; i < reserve; i++) {
    reservation.push({
      name: `passenger${i + numberOfPassengers + 1}`,
      location: `${locations[i]}`,
    });
  }

  // To get count of trips
    while (passengers > 50 && shuffle > 0) {
    count++;
    passengers -= 50;
    shuffle--;
  }
  let numberOfBoarded = [...boarded];
  let spliced = boarded.splice(50 * (count - 1), 50);

  let spillover = numberOfBoarded.splice(numberOfBoarded.indexOf(spliced[spliced.length - 1]) + 1);

  return {
    boarded: spliced,
    reservation: spillover.concat(reservation),
    count: count,
  };

};

export default taskOne;