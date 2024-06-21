//
//  ResourceBlocker.swift
//
//  Created by Jérôme Morissard on 22/02/2023.
//  Copyright © 2024 Bryj.ai. All rights reserved.
//

import FASDKBuild_ios
import Foundation

public enum ResourceBlockerMoment {
    /// In all the WebViews
    case everyTime

    /// In all the WebViews when the splash screen is visible
    case willSplashViewVisible

    /// In the WebView used during the perstistent login process
    case hiddenAutoLoginWebView
}

public class ResourceBlocker {
    /// Specify during which phase of the app to block the resources
    public var moment = ResourceBlockerMoment.everyTime

    /// This will block the resources downloading in all sections
    public var resources = [String]()

    public init() {}
}

public class SectionResourceBlocker: ResourceBlocker {
    /// Specificfy which sections to block resources
    public var sectionIndexes = [Int]()

    public override init() {
        super.init()
    }
}

extension ResourceBlocker {
    func indexIsValid(sectionViewController: FASectionViewController) -> Bool {
        if let sectionBlocker = self as? SectionResourceBlocker {
            var index = -1
            if let tabIndex = sectionViewController.tabIndex() {
                index = tabIndex
            }

            if sectionBlocker.sectionIndexes.contains(index)
                || sectionBlocker.sectionIndexes.isEmpty {
                return true
            } else {
                return false
            }
        }

        return true
    }

    func momentIsValid(sectionViewController: FASectionViewController) -> Bool {
        switch moment {
        case .everyTime:
            return true

        case .willSplashViewVisible:
            if FABuilder.shared.computedStates().contains(.splashViewVisible) {
                return true
            }

        case .hiddenAutoLoginWebView:
            if sectionViewController.sectionType() == .webLoginPageSection {
                return true
            }
        }

        return false
    }

    func validFor(sectionViewController: FASectionViewController) -> Bool {
        return indexIsValid(sectionViewController: sectionViewController)
            && momentIsValid(sectionViewController: sectionViewController)
    }
}
