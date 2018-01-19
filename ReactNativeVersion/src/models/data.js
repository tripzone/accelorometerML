import { save as saveToDB, predictModel } from '../utils/db';

export class Data {
  constructor() {
    this.accelArray = [];
    this.gyroArray = [];
    this.prediction = null;
    this.processedData = null;
  }
  setPrediction = prediction => (this.prediction = prediction);
  addGyroData = gyroData => this.gyroArray.push(gyroData);
  addAccelData = accelData => this.accelArray.push(accelData);
  processData = () => {
    console.log('processing data');
    this.processedData = {};
    this.processedData.datapoints = this.accelArray
      .map((accelData, i) => {
        const gyroData = this.gyroArray[i];
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
  };

  save = () => {
    console.log('saving recorded data');
    this.processData();
    this.processedData.prediction = this.prediction;
    saveToDB(this.processedData);
  };
  saveForPredict = onChange => {
    console.log('saving predict data');
    this.processData();
    predictModel(this.processedData, onChange);
  };
}
