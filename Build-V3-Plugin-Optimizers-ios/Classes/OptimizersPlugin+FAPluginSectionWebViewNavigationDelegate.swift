//
//  OptimizersPlugin+FAPluginSectionWebViewNavigationDelegate.swift
//
//  Created by Jérôme Morissard on 16/05/2022.
//  Copyright © 2024 Bryj.ai. All rights reserved.
//

import FASDKBuild_ios
import Foundation
import WebKit

extension OptimizersPlugin: FAPluginSectionWebViewNavigationDelegate {
    public func sectionViewControllerDidStart(navigation: WKNavigation!, sectionViewController: FASectionViewController) { }
    public func sectionViewControllerDecidePolicyFor(navigationAction: WKNavigationAction, sectionViewController: FASectionViewController) -> (actionPolicy: WKNavigationActionPolicy, urlToLoad: URL?) { return (.allow, nil) }

    public func sectionViewControllerDecidePolicyFor(navigationResponse: WKNavigationResponse, sectionViewController: FASectionViewController) -> WKNavigationResponsePolicy { return .allow }

    public func sectionViewControllerDidReceive(challenge: URLAuthenticationChallenge, sectionViewController: FASectionViewController) -> URLSession.AuthChallengeDisposition { return .useCredential }

    public func sectionViewControllerDidFinish(navigation: WKNavigation!, sectionViewController: FASectionViewController) {
    }

    func applyBlockers(sectionViewController: FASectionViewController) {
        guard let wv = sectionViewController.webView() else {
            return
        }

        ContentRuleListStoreManager.shared.removeOptimizerContentRuleList(forWebView: wv)

        var resources = [String]()
        for b in blockers {
            if b.validFor(sectionViewController: sectionViewController) {
                resources.append(contentsOf: b.resources)
            }
        }

        ContentRuleListStoreManager.shared.addOptimizerContentRuleLis(forWebView: wv, toBlockResources: resources)
    }
}
