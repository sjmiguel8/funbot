#import <Foundation/Foundation.h>

NSBundle* grpcppWrapper_SWIFTPM_MODULE_BUNDLE() {
    NSURL *bundleURL = [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"gRPC_grpcppWrapper.bundle"];

    NSBundle *preferredBundle = [NSBundle bundleWithURL:bundleURL];
    if (preferredBundle == nil) {
      return [NSBundle bundleWithPath:@"/Users/miguelbonilla/Desktop/Coding/funbot/.build/arm64-apple-macosx/debug/gRPC_grpcppWrapper.bundle"];
    }

    return preferredBundle;
}