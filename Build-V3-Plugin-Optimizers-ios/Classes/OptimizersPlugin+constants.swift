//
//  OptimizersPlugin+constants.swift
//  Build-V3-Plugin-Optimizers-ios
//
//  Created by Jérôme Morissard on 16/05/2022.
//  Copyright © 2022 Bryj.ai. All rights reserved.
//

import FASDKBuild_ios
import Foundation
import WebKit

public enum OptimizersPluginConstants {
    public static let knownAnalytics =
    [
        ".bing.com",
        ".cquotient.com",
        ".optimizely.com",
        ".facebook.net",
        ".pinterest.com",
        ".snapchat.com",
        ".clarity.ms",
        ".doubleclick.net",
        ".criteo.com",
        "criteo.net",
        "insight.adsrvr.org",
        "adservice.google.com",
        "googlesyndication.com",
        "googleadservices.com",
        "googletagmanager.com",
        //"gstatic.com"
    ]
        
    public static let knownImageExtensions = [
        ".png",
        ".gif",
        ".jpg",
        ".jpeg"
    ]
}
