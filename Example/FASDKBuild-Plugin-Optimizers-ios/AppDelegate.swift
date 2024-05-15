//
//  AppDelegate.swift
//  FASDKBuild-Plugin-Optimizers-ios
//
//  Created by Jérôme Morissard on 05/17/2022.
//  Copyright (c) 2022 Jérôme Morissard. All rights reserved.
//

import UIKit
import FASDKBuild_ios

@UIApplicationMain
class AppDelegate: FABaseAppDelegate {
    override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        appCoordinator = AppCoordinator(window: self.window!)
        appCoordinator.start()
        window?.makeKeyAndVisible()
        return true
    }

}
