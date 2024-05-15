//
//  AppCoordinator.swift
//  FASDKBuild-Plugin-Optimizers-ios
//
//  Created by Jérôme Morissard on 05/17/2022.
//  Copyright (c) 2022 Jérôme Morissard. All rights reserved.
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
        optimizersPlugin.lazyLoadingConfiguration.classListToExclude.append(contentsOf: ["product-tile"])

        return [optimizersPlugin]
    }
}
