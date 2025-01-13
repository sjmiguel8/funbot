import SwiftUI

struct Notification: Identifiable {
    let id = UUID()
    let type: NotificationType
    let username: String
    let message: String
    let timeAgo: String
}

enum NotificationType {
    case like
    case mention
    case follow
    
    var icon: String {
        switch self {
        case .like: return "heart.fill"
        case .mention: return "at"
        case .follow: return "person.fill.badge.plus"
        }
    }
    
    var color: Color {
        switch self {
        case .like: return .red
        case .mention: return .blue
        case .follow: return .green
        }
    }
}

// Sample notifications
let notifications = [
    Notification(type: .like, username: "@sarah", message: "liked your post", timeAgo: "2m ago"),
    Notification(type: .mention, username: "@mike", message: "mentioned you", timeAgo: "1h ago"),
    Notification(type: .follow, username: "@emma", message: "followed you", timeAgo: "2h ago")
] 