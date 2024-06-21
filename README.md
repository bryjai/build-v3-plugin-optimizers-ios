# Build-V3-Plugin-Optimizers-ios

Build-V3-Plugin-Optimizers-ios is a plugin capable of providing multiple ways to optimize the website experience.

## Usage

### How to enable the plugin

```swift
override func getPlugins() -> [FABasePlugin] {
    let optimizersPlugin = OptimizersPlugin()
    return [optimizersPlugin]
}
```

### How to configure the plugin?

The plugin supports addition of multiple blockers

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

### How to configure a resource blocker?

Use the ResourceBlocker class/instance to block a **list of resources** during a **specified moment**

```swift
public class ResourceBlocker {
    public var moment = ResourceBlockerMoment.everyTime
    public var resources = [String]()
}
```

**Specified moment** - Specify which phase of the app should the plugin block the resources

```swift
public enum ResourceBlockerMoment {
    case everyTime // In all the webviews
    case willSplashViewVisible // In all the webviews while the splashview is visible
    case hiddenAutoLoginWebView // In the hidden webview used for the AutoLogin feature
}
```

### How to configure the plugin to block a resource on specific sections?

Use the SectionResourceBlocker class/instance to block a **list of resources** on **a restricted list of sections**

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

## Installation

To install it, simply add the following line to your Podfile:

```ruby
pod 'Build-V3-Plugin-Optimizers-ios', :git => 'git@github.com:bryjai/build-v3-plugin-optimizers-ios.git'
```

## Author

Jérôme Morissard, jerome.morissard@bryj.ai

## License

Build-V3-Plugin-Optimizers-ios is available under the MIT license. See the LICENSE file for more info.
