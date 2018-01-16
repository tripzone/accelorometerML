import { saveToDB } from '../utils/db';

export class Data {
  constructor() {
    this.accelArray = [];
    this.gyroArray = [];
    this.prediction = null;
  }
  setPrediction = prediction => (this.prediction = prediction);
  addGyroData = gyroData => this.gyroArray.push(gyroData);
  addAccelData = accelData => this.accelArray.push(accelData);
  save = () => {
    const dataToSave = this.accelArray
      .map((accelData, i) => {
        const gyroData = this.gyroArray[i];
        // Only save if both gyroData & accelData exist, else ignore
        if (gyroData && accelData)
          return {
            gx: gyroData.x,
            gy: gyroData.y,
            gz: gyroData.z,
            ax: accelData.x,
            ay: accelData.y,
            az: accelData.z,
          };
        return null;
      })
      .filter(data => data);
    dataToSave.prediction = this.prediction;
    saveToDB(dataToSave);
  };
}
