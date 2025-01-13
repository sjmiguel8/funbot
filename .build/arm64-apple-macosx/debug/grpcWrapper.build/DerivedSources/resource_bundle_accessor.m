#import <Foundation/Foundation.h>

NSBundle* grpcWrapper_SWIFTPM_MODULE_BUNDLE() {
    NSURL *bundleURL = [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"gRPC_grpcWrapper.bundle"];

    NSBundle *preferredBundle = [NSBundle bundleWithURL:bundleURL];
    if (preferredBundle == nil) {
      return [NSBundle bundleWithPath:@"/Users/miguelbonilla/Desktop/Coding/funbot/.build/arm64-apple-macosx/debug/gRPC_grpcWrapper.bundle"];
    }

    return preferredBundle;
}