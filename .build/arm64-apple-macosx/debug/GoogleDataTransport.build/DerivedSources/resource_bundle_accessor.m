#import <Foundation/Foundation.h>

NSBundle* GoogleDataTransport_SWIFTPM_MODULE_BUNDLE() {
    NSURL *bundleURL = [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"GoogleDataTransport_GoogleDataTransport.bundle"];

    NSBundle *preferredBundle = [NSBundle bundleWithURL:bundleURL];
    if (preferredBundle == nil) {
      return [NSBundle bundleWithPath:@"/Users/miguelbonilla/Desktop/Coding/funbot/.build/arm64-apple-macosx/debug/GoogleDataTransport_GoogleDataTransport.bundle"];
    }

    return preferredBundle;
}