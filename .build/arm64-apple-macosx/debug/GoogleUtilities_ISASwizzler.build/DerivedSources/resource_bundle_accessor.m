#import <Foundation/Foundation.h>

NSBundle* GoogleUtilities_ISASwizzler_SWIFTPM_MODULE_BUNDLE() {
    NSURL *bundleURL = [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"GoogleUtilities_GoogleUtilities-ISASwizzler.bundle"];

    NSBundle *preferredBundle = [NSBundle bundleWithURL:bundleURL];
    if (preferredBundle == nil) {
      return [NSBundle bundleWithPath:@"/Users/miguelbonilla/Desktop/Coding/funbot/.build/arm64-apple-macosx/debug/GoogleUtilities_GoogleUtilities-ISASwizzler.bundle"];
    }

    return preferredBundle;
}