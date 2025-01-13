import SwiftUI

struct NavigationList: View {
    var body: some View {
        List {
            NavigationLink(destination: FeedView(searchText: .constant(""), newPostText: .constant(""))) {
                Text("Home")
            }
            NavigationLink(destination: ExploreView()) {
                Text("Explore")
            }
            NavigationLink(destination: NotificationsView()) {
                Text("Notifications")
            }
            NavigationLink(destination: MessagesView()) {
                Text("Messages")
            }
            NavigationLink(destination: BookmarksView()) {
                Text("Bookmarks")
            }
            NavigationLink(destination: ProfileView()) {
                Text("Profile")
            }
        }
        .listStyle(SidebarListStyle())
        .accentColor(.blue)
    }
}