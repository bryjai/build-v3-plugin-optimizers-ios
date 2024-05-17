//
//  OptimizersPlugin.swift
//
//  Created by Jérôme Morissard on 16/05/2022.
//  Copyright © 2024 Bryj.ai. All rights reserved.
//

import FASDKBuild_ios
import Foundation
import WebKit

public class LazyLoadingConfiguration {
    // This will ignore the images if mentioned classes are exist into classList
    public var classListToExclude = [String]()

    //
    public var forceLazyLoading = false
}

public class OptimizersPlugin: FABasePlugin {
    // Resource Blockers
    public var blockers = [ResourceBlocker]()

    // LazyLoading Configuration
    public var lazyLoadingConfiguration = LazyLoadingConfiguration()

    public override init() {
        super.init()
        self.sectionLifeCycleDelegate = self
        self.sectionWebViewNavigationDelegate = self
    }
}
