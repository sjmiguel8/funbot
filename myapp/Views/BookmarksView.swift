import SwiftUI

struct BookmarksView: View {
    var body: some View {
        VStack {
            Text("Bookmarks")
                .font(.largeTitle)
                .padding()
            Text("Your saved posts will appear here.")
                .foregroundColor(.secondary)
        }
    }
} 