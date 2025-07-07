//
//  AppCoordinator.swift
//  Build-V3-Plugin-Optimizers-ios
//
//  Created by Pedro Fernandes on 17/05/2024.
//  Copyright (c) 2024 Bryj.ai. All rights reserved.
//

import Build_V3_Plugin_Optimizers_ios
import FASDKBuild_ios
import Foundation
import WebKit

class AppCoordinator: FABaseAppCoordinator {
    override func getConfigurationName() -> String? {
        return "configuration"
    }

    override func getPlugins() -> [FABasePlugin] {
        let optimizersPlugin = OptimizersPlugin()

        let analyticsBlocker = ResourceBlocker()
        analyticsBlocker.moment = .everyTime
        analyticsBlocker.resources = OptimizersPluginConstants.knownAnalytics

        optimizersPlugin.blockers.append(contentsOf: [analyticsBlocker])
        optimizersPlugin.lazyLoadingConfiguration.forceLazyLoading = true
        optimizersPlugin.lazyLoadingConfiguration.classListToExclude.append(contentsOf: ["tile-image"])

        return [optimizersPlugin]
    }
}
