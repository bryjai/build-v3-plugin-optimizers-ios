# Build-V3-Plugin-Optimizers-ios

## Example

To run the example project, clone the repo, and run `pod install` from the Example directory first.

## Requirements

## Installation

Build-V3-Plugin-Optimizers-ios is available through [CocoaPods](https://cocoapods.org). To install
it, simply add the following line to your Podfile:

```ruby
pod 'Build-V3-Plugin-Optimizers-ios', :git => 'git@github.com:bryjai/build-v3-plugin-optimizers-ios.git'
```

## Usage 

Optimizers is an analyzing Plugin to block resources on demands in the WebView on the BuildSDK

### How to enable the plugin 

```swift
    override func getPlugins() -> [FABasePlugin] {
        let optimizersPlugin = OptimizersPlugin()
        return [optimizersPlugin]
    }
```

### How to configure the plugin?

The Plugin supports addition of multiple blockers 

```swift
    override func getPlugins() -> [FABasePlugin] {
        let optimizersPlugin = OptimizersPlugin()
                
        let analyticsFullBlocker = ResourceBlocker()
        analyticsFullBlocker.moment = .everyTime
        analyticsFullBlocker.resources = OptimizersPluginConstants.knownAnalytics
        optimizersPlugin.blockers.append(analyticsFullBlocker)
        
        return [optimizersPlugin]
    }
```

### How to configure the plugin a resource blocker?

Use the ResourceBlocker class/instance to block a **list of resources** during **specified moment**

```swift
public class ResourceBlocker {
    public var moment = ResourceBlockerMoment.everyTime    
    public var resources = [String]()    
}
```

**Specified moment** - Specify during which phase of the app to block the resources

```swift
public enum ResourceBlockerMoment {
    case everyTime // In all the WebViews
    case willSplashViewVisible // In all the WebViews will SplashView is visible
    case hiddenAutoLoginWebView // In the hidden WebView used for the AutoLogin
}
```

### How to configure the plugin to block a resource on specific sections?

Use the SectionResourceBlocker class/instance to block a **list of resources** during **specified moment** on **a restricted list of Sections**

```swift
public class SectionResourceBlocker: ResourceBlocker {
    public var sectionIndexes = [Int]()
}
```

```swift
    override func getPlugins() -> [FABasePlugin] {
        let optimizersPlugin = OptimizersPlugin()
                
        let sectionBlocker = SectionResourceBlocker()
        sectionBlocker.sectionIndexes = [0, 1, 2]
        sectionBlocker.moment = .everyTime
        sectionBlocker.resources = OptimizersPluginConstants.knownAnalytics
        optimizersPlugin.blockers.append(sectionBlocker)
        
        return [optimizersPlugin]
    }
```

## Author

Jérôme Morissard, jerome.morissard@bryj.ai

## License

Build-V3-Plugin-Optimizers-ios is available under the MIT license. See the LICENSE file for more info.
