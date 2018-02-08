export class Data {
  constructor() {
    this.accelArray = [];
    this.gyroArray = [];
    this.workoutName = null;
  }
  setWorkout = workoutName => {
    this.workoutName = workoutName;
    return this;
  };
  addGyroData = gyroData => {
    this.gyroArray.push(gyroData);
    return this;
  };
  addAccelData = accelData => {
    this.accelArray.push(accelData);
    return this;
  };
}
