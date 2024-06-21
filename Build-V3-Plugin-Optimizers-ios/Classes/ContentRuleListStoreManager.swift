//
//  ContentRuleListStoreManager.swift
//
//  Created by Jérôme Morissard on 22/02/2023.
//  Copyright © 2024 Bryj.ai. All rights reserved.
//

import Foundation
import WebKit

class ContentRuleListStoreManager {
    static let shared = ContentRuleListStoreManager()

    public var storedContentRuleList = [String: WKContentRuleList]()

    static func contentBlockingRules() -> String {
        return "PluginOptimizerContentBlockingRules"
    }

    func key(forWebView: WKWebView) -> String {
        let address = "\(Unmanaged.passUnretained(forWebView).toOpaque())"
        return address
    }

    func removeOptimizerContentRuleList(forWebView: WKWebView) {
        let key = key(forWebView: forWebView)
        if let r = storedContentRuleList[key] {
            forWebView.configuration.userContentController.remove(r)
            storedContentRuleList.removeValue(forKey: key)
        }
    }

    func addOptimizerContentRuleLis(forWebView: WKWebView, toBlockResources: [String]) {
        WKContentRuleListStore.default()
            .compileContentRuleList(forIdentifier: ContentRuleListStoreManager.contentBlockingRules(), encodedContentRuleList: resourcesRules(resources: toBlockResources)) {
                contentRuleList, error in
                if error != nil { return }
                if let rule = contentRuleList {
                    let key = self.key(forWebView: forWebView)
                    self.storedContentRuleList[key] = rule
                    forWebView.configuration.userContentController.add(rule)
                }
            }
    }

    func resourcesRules(resources: [String]) -> String {
        var rules = [String]()

        for filter in resources {
            rules.append("""
                                {
                                    "trigger": {
                                        "url-filter": "\(filter)",
                                        "resource-type": ["script", "style-sheet", "image"]
                                    },
                                    "action": {
                                        "type": "block"
                                    }
                                }
                    """)
        }

        return "[\(rules.joined(separator: ","))]"
    }
}
