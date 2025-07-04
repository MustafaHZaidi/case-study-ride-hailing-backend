class Ride {
  constructor(id, passengerId, pickup, drop, rideType) {
    this.id = id;
    this.passengerId = passengerId;
    this.driverId = null;        
    this.pickup = pickup;
    this.drop = drop;
    this.rideType = rideType;
    this.status = "Requested"; // Status can be "Requested", "Accepted", "Completed", or "Cancelled"
  }
}

module.exports = Ride;
