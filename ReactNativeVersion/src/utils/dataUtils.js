import { save as saveToDB, predictModel } from '../utils/db';

export const processData = data => ({
  dataPoints: data.accelArray
    .map((accelData, i) => {
      const gyroData = data.gyroArray[i];
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
    .filter(x => x),
  workoutName: data.workoutName,
  repCount: data.repCount,
});

export const save = data => saveToDB(processData(data));

export const saveForPredict = (data, onChange) =>
  predictModel(processData(data), onChange);
