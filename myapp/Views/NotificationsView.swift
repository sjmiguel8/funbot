import SwiftUI

struct NotificationsView: View {
    @State private var selectedFilter = "all"
    
    var body: some View {
        VStack(spacing: 0) {
            // Filter tabs
            Picker("Filter", selection: $selectedFilter) {
                Text("All").tag("all")
                Text("Mentions").tag("mentions")
                Text("Likes").tag("likes")
            }
            .pickerStyle(.segmented)
            .padding()
            
            List {
                ForEach(getFilteredNotifications(), id: \.id) { notification in
                    NotificationRow(notification: notification)
                }
            }
            .listStyle(PlainListStyle())
        }
    }
    
    private func getFilteredNotifications() -> [Notification] {
        // Filter notifications based on selectedFilter
        notifications.filter { notification in
            switch selectedFilter {
            case "mentions":
                return notification.type == .mention
            case "likes":
                return notification.type == .like
            default:
                return true
            }
        }
    }
}

struct NotificationRow: View {
    let notification: Notification
    
    var body: some View {
        HStack {
            Image(systemName: notification.type.icon)
                .foregroundColor(notification.type.color)
            
            VStack(alignment: .leading) {
                Text(notification.username)
                    .fontWeight(.bold)
                Text(notification.message)
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            Text(notification.timeAgo)
                .font(.caption)
                .foregroundColor(.gray)
        }
        .padding(.vertical, 8)
    }
}