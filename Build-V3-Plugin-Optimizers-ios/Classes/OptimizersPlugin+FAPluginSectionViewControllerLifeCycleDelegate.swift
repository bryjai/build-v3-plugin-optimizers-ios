//
//  OptimizersPlugin+FAPluginSectionViewControllerLifeCycleDelegate.swift
//  Build-V3-Plugin-Optimizers-ios
//
//  Created by Jérôme Morissard on 16/05/2022.
//  Copyright © 2022 Bryj.ai. All rights reserved.
//

import FASDKBuild_ios
import Foundation
import WebKit

extension OptimizersPlugin: FAPluginSectionViewControllerLifeCycleDelegate {
    public func lifeCycleWebViewWillBeInitialized(sectionViewController: FASectionViewController, configuration: WKWebViewConfiguration) {}
    
    public func lifeCycleWebViewInitialized(sectionViewController: FASectionViewController) {
        // init the blockers
        applyBlockers(sectionViewController: sectionViewController)
        
        // Disable auto-init of lazySizes
        if self.lazyLoadingConfiguration.forceLazyLoading {
            let classBundle = Bundle(for: OptimizersPlugin.self)
            if let bundle = Bundle(path: classBundle.bundlePath.appending("/Build-V3-Plugin-Optimizers-ios.bundle")) {
                sectionViewController.webView()!.addJavascriptFileInjectionIfNeeded(resource: "lazysizes", forMainFrameOnly: true, bundle: bundle)
                sectionViewController.webView()!.addJavascriptFileInjectionIfNeeded(resource: "interface_auto_lazzyload", forMainFrameOnly: true, bundle: bundle)
                
                var startScript = "FABuild.internal.initLazyLoading();"
                if lazyLoadingConfiguration.classListToExclude.isEmpty == false {
                    var injectExcludeClasses = "";
                    for c in lazyLoadingConfiguration.classListToExclude {
                        injectExcludeClasses.append("window.lazySizesConfig.classListToExclude.push(\"\(c)\");")
                    }
                    startScript = "\(injectExcludeClasses); \(startScript)"
                }
                
                sectionViewController.webView()!.addJavascriptSourceInjectionIfNeeded(source: startScript, identifier: "FABuild.internal.initLazyLoading", forMainFrameOnly: true, injectionTime: .atDocumentStart)
            }
        }
    }
}
