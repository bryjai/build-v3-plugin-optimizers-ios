#
# Be sure to run `pod lib lint Build-V3-Plugin-Optimizers-ios.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'Build-V3-Plugin-Optimizers-ios'
  s.version          = '0.1.0'
  s.summary          = 'A short description of Build-V3-Plugin-Optimizers-ios.'

  s.description      = <<-DESC
  Build-V3-Plugin-Optimizers-ios is a Plugin to use with the BuildSDK. This plugin provides multiple ways to optimize the Website experience.
  Blocking Resources : The Plugin is able to block the loading of some specific resources in the Section WebViews.
  Force Lazy Loading : The Plugin can try to force the lazy loading of the website images.
                       DESC

  s.homepage         = 'https://github.com/bryjai/build-v3-plugin-optimizers-ios'
  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'Jérôme Morissard' => 'jerome.morissard@bryj.ai' }
  s.source           = { :git => 'git@github.com:bryjai/build-v3-plugin-optimizers-ios.git', :tag => s.version.to_s }
  # s.social_media_url = 'https://twitter.com/<TWITTER_USERNAME>'

  s.ios.deployment_target = '11.1'
  s.swift_version = '5.0'

  s.source_files = 'Build-V3-Plugin-Optimizers-ios/Classes/*'
  
  s.resource_bundles = {
     'Build-V3-Plugin-Optimizers-ios' => ['Build-V3-Plugin-Optimizers-ios/Assets/*.js']
   }

  # s.public_header_files = 'Pod/Classes/**/*.h'
  # s.frameworks = 'UIKit', 'MapKit'
  # s.dependency 'AFNetworking', '~> 2.3'
  s.dependency 'FASDKBuild-ios', '>= 3.7.7'
  s.user_target_xcconfig = { 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64'}
  s.pod_target_xcconfig = { 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64' }
end
