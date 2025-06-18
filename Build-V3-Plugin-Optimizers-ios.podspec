#
# Be sure to run `pod lib lint Build-V3-Plugin-Optimizers-ios.podspec' to ensure this is a valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'Build-V3-Plugin-Optimizers-ios'
  s.version          = '1.0.1'
  s.summary          = 'Build-V3-Plugin-Optimizers-ios is a plugin capable of providing multiple ways to optimize the website experience.'
  s.description      = <<-DESC
  Build-V3-Plugin-Optimizers-ios is a plugin capable of providing multiple ways to optimize the website experience by providing the following functionality:
  - Resource blocking: The plugin is able to block the loading of some specific resources in the section webviews.
  - Lazy loading: The plugin can try to force the lazy loading of the website images.
                       DESC
  s.homepage         = 'https://github.com/bryjai/build-v3-plugin-optimizers-ios'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'Jérôme Morissard' => 'jerome.morissard@bryj.ai' }
  s.source           = { :git => 'git@github.com:bryjai/build-v3-plugin-optimizers-ios.git', :tag => s.version.to_s }
  s.ios.deployment_target = '14.0'
  s.swift_version = '5.0'
  s.source_files = 'Build-V3-Plugin-Optimizers-ios/Classes/**/*'
  s.resource_bundles = {'Build-V3-Plugin-Optimizers-ios' => ['Build-V3-Plugin-Optimizers-ios/Assets/*.{js}', 'PrivacyInfo.xcprivacy']}
  s.dependency 'FASDKBuild-ios', '> 3.9.7'
end
