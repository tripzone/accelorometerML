//
//  apicall.swift
//  accelero
//
//  Created by Zahir, Kasra (CA - Toronto) on 2017-07-17.
//  Copyright © 2017 Zahir, Kasra (CA - Toronto). All rights reserved.
//

import Foundation

func patchCall (body : String) {
    let url = NSURL(string: "http://52.55.4.4:7501") //Remember to put ATS exception if the URL is not https
    let request = NSMutableURLRequest(url: url! as URL)
    request.addValue("application/json", forHTTPHeaderField: "Content-Type") //Optional
    request.httpMethod = "POST"
    let session = URLSession(configuration:URLSessionConfiguration.default, delegate: nil, delegateQueue: nil)
    let data = body.data(using: String.Encoding.utf8)
    request.httpBody = data
    
    let dataTask = session.dataTask(with: request as URLRequest) { (data, response, error) -> Void in
        if error != nil {
            //handle error
        }
        else {
            let jsonStr = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
            print("Parsed JSON: '\(String(describing: jsonStr))'")
        }
    }
    dataTask.resume()
}

func viewDidAppear(_ animated: Bool) {
}
