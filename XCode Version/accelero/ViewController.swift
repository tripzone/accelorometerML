import UIKit
import CoreMotion

class ViewController: UIViewController {
    
    @IBOutlet weak var r1Button: UIButton!
    @IBOutlet weak var r2Button: UIButton!
    @IBOutlet weak var r3Button: UIButton!
        
    var motionManager = CMMotionManager()
    
    struct payload {
        static var data = [[ : ]]
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    func runAcceloGyro (button: String) {
//      motionManager.accelerometerUpdateInterval = 0.1
//      motionManager.gyroUpdateInterval = 0.1
        motionManager.deviceMotionUpdateInterval = 0.1
        payload.data = []
        motionManager.startDeviceMotionUpdates(to: OperationQueue.current!) {(data, error) in
            if let myData = data {
                payload.data.append([
                    "rotationRateX": myData.rotationRate.x,
                    "rotationRateY": myData.rotationRate.y,
                    "rotationRateZ": myData.rotationRate.z,
                    "accelerationX": myData.userAcceleration.x,
                    "accelerationY": myData.userAcceleration.y,
                    "accelerationZ": myData.userAcceleration.z,
                    "timestamp": myData.timestamp,
                    "button": button
                ])
                print("recorded datapoint")
            }
        }
    }
    
    func stopAcceloGyro() {
        print("Stopping")
        do {
            print("key is ", Int(NSDate().timeIntervalSince1970))
            let wrappedPayLoad = [String(Int(NSDate().timeIntervalSince1970)) : payload.data]
            let jsonData = try JSONSerialization.data(withJSONObject: wrappedPayLoad, options: .prettyPrinted)
            let jsonString = NSString(data: jsonData, encoding: String.Encoding.utf8.rawValue)! as String
            print(jsonString)
            patchCall(body : jsonString)
        } catch {
            print(error.localizedDescription)
        }
        motionManager.stopDeviceMotionUpdates()
    }
    
    var record1On : Bool = false
    @IBAction func record1(_ sender: Any) {
        record1On = !record1On
        if record1On == true {
            r1Button.setTitle("stop", for: .normal)
            r2Button.isEnabled = false
            r3Button.isEnabled = false
            runAcceloGyro(button: "1")
        } else {
            r1Button.setTitle("Record 1", for: .normal)
            stopAcceloGyro()
            r2Button.isEnabled = true
            r3Button.isEnabled = true
        }
    }
    
    var record2On : Bool = false
    @IBAction func record2(_ sender: Any) {
        record2On = !record2On
        if record2On == true {
            r2Button.setTitle("stop", for: .normal)
            r1Button.isEnabled = false
            r3Button.isEnabled = false
            runAcceloGyro(button: "2")
        } else {
            r2Button.setTitle("Record 2", for: .normal)
            stopAcceloGyro()
            r1Button.isEnabled = true
            r3Button.isEnabled = true
        }
    }
    
    var record3On : Bool = false
    @IBAction func record3(_ sender: Any) {
        record3On = !record3On
        if record3On == true {
            r3Button.setTitle("stop", for: .normal)
            r1Button.isEnabled = false
            r2Button.isEnabled = false
            runAcceloGyro(button: "3")
        } else {
            r3Button.setTitle("Record 2", for: .normal)
            stopAcceloGyro()
            r1Button.isEnabled = true
            r2Button.isEnabled = true
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}


