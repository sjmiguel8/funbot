#import <Foundation/Foundation.h>

NSBundle* FirebaseCoreExtension_SWIFTPM_MODULE_BUNDLE() {
    NSURL *bundleURL = [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"Firebase_FirebaseCoreExtension.bundle"];

    NSBundle *preferredBundle = [NSBundle bundleWithURL:bundleURL];
    if (preferredBundle == nil) {
      return [NSBundle bundleWithPath:@"/Users/miguelbonilla/Desktop/Coding/funbot/.build/arm64-apple-macosx/debug/Firebase_FirebaseCoreExtension.bundle"];
    }

    return preferredBundle;
}