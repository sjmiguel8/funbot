#import <Foundation/Foundation.h>

NSBundle* FirebaseDynamicLinks_SWIFTPM_MODULE_BUNDLE() {
    NSURL *bundleURL = [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"Firebase_FirebaseDynamicLinks.bundle"];

    NSBundle *preferredBundle = [NSBundle bundleWithURL:bundleURL];
    if (preferredBundle == nil) {
      return [NSBundle bundleWithPath:@"/Users/miguelbonilla/Desktop/Coding/funbot/.build/arm64-apple-macosx/debug/Firebase_FirebaseDynamicLinks.bundle"];
    }

    return preferredBundle;
}