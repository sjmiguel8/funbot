import SwiftUI

struct HomeView: View {
    @StateObject private var authManager = AuthManager.shared
    @State private var searchText = ""
    @State private var newPostText = ""
    @State private var columnVisibility = NavigationSplitViewVisibility.automatic
    @State private var selectedSidebarItem: String? = "home"
    
    // Sample user data
    let currentUser = Models.User(
        name: "John Doe",
        username: "@johndoe",
        avatar: "👤",
        followers: 1234,
        following: 567
    )
    
    var body: some View {
        Group {
            if authManager.isAuthenticated {
                NavigationSplitView(columnVisibility: $columnVisibility) {
                    // Sidebar
                    VStack {
                        List(selection: $selectedSidebarItem) {
                            NavigationLink(value: "home") {
                                Label("Home", systemImage: "house.fill")
                            }
                            NavigationLink(value: "explore") {
                                Label("Explore", systemImage: "safari.fill")
                            }
                            NavigationLink(value: "notifications") {
                                Label("Notifications", systemImage: "bell.fill")
                            }
                            NavigationLink(value: "messages") {
                                Label("Messages", systemImage: "envelope.fill")
                            }
                            NavigationLink(value: "bookmarks") {
                                Label("Bookmarks", systemImage: "bookmark.fill")
                            }
                            NavigationLink(value: "profile") {
                                Label("Profile", systemImage: "person.fill")
                            }
                        }
                        .listStyle(SidebarListStyle())
                        .frame(minWidth: 250)
                        
                        // Add logout button at bottom
                        Button(action: {
                            try? authManager.signOut()
                        }) {
                            Label("Logout", systemImage: "rectangle.portrait.and.arrow.right")
                                .foregroundColor(.red)
                        }
                        .padding()
                    }
                } detail: {
                    NavigationStack {
                        Group {
                            switch selectedSidebarItem {
                            case "home":
                                FeedView(searchText: $searchText, newPostText: $newPostText)
                            case "explore":
                                ExploreView()
                            case "notifications":
                                NotificationsView()
                            case "messages":
                                MessagesView()
                            case "bookmarks":
                                BookmarksView()
                            case "profile":
                                ProfileView()
                            default:
                                FeedView(searchText: $searchText, newPostText: $newPostText)
                            }
                        }
                    }
                }
                .frame(minWidth: 900, minHeight: 600)
            } else {
                LoginView()
            }
        }
    }
}

struct FeedView: View {
    @Binding var searchText: String
    @Binding var newPostText: String
    @State private var selectedImage: NSImage?
    @State private var showImagePicker = false
    
    var body: some View {
        VStack(spacing: 0) {
            // Top bar
            HStack {
                Text("Wavelength")
                    .font(.system(size: 24, weight: .bold, design: .rounded))
                    .foregroundColor(.accentColor)
                Spacer()
                
                // Search
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.gray)
                    TextField("Search", text: $searchText)
                        .textFieldStyle(.roundedBorder)
                        .frame(width: 200)
                }
            }
            .padding()
            .background(Color(.windowBackgroundColor))
            
            ScrollView {
                VStack(spacing: 20) {
                    // New post creation
                    VStack(alignment: .leading) {
                        Text("Create Post")
                            .font(.headline)
                            .padding(.horizontal)
                        
                        VStack {
                            TextEditor(text: $newPostText)
                                .frame(height: 100)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 8)
                                        .stroke(Color.accentColor.opacity(0.2))
                                )
                                .padding()
                            
                            HStack {
                                Button(action: { showImagePicker = true }) {
                                    Label("Add Image", systemImage: "photo")
                                }
                                .buttonStyle(.borderless)
                                
                                Spacer()
                                
                                Button("Post") {
                                    // Post action
                                    newPostText = ""
                                    selectedImage = nil
                                }
                                .buttonStyle(.borderedProminent)
                            }
                            .padding(.horizontal)
                            
                            if let image = selectedImage {
                                Image(nsImage: image)
                                    .resizable()
                                    .scaledToFit()
                                    .frame(height: 200)
                                    .cornerRadius(8)
                                    .padding()
                            }
                        }
                        .background(Color(.windowBackgroundColor).opacity(0.3))
                        .cornerRadius(12)
                        .shadow(radius: 1)
                    }
                    .padding(.horizontal)
                    
                    // Posts feed
                    ForEach(samplePosts) { post in
                        PostCard(post: post)
                            .padding(.horizontal)
                    }
                }
                .padding(.vertical)
            }
            .background(Color(.windowBackgroundColor).opacity(0.2))
        }
        .sheet(isPresented: $showImagePicker) {
            ImagePicker(image: $selectedImage)
        }
    }
}

// Sample data structures
struct User: Identifiable {
    let id = UUID()
    let name: String
    let username: String
    let avatar: String
    let followers: Int
    let following: Int
}

struct Post: Identifiable {
    let id = UUID()
    let user: User
    let content: String
    let timestamp: String
    let likes: Int
    let comments: Int
    var isLiked: Bool
}

struct PostCard: View {
    let post: Post
    @State private var isLiked: Bool
    
    init(post: Post) {
        self.post = post
        _isLiked = State(initialValue: post.isLiked)
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // User info
            HStack {
                Text(post.user.avatar)
                    .font(.title)
                VStack(alignment: .leading) {
                    Text(post.user.name)
                        .fontWeight(.bold)
                    Text(post.user.username)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                Spacer()
                Text(post.timestamp)
                    .font(.caption)
                    .foregroundColor(.gray)
            }
            
            // Post content
            Text(post.content)
                .padding(.vertical, 4)
            
            // Interaction buttons
            HStack(spacing: 20) {
                Button(action: { isLiked.toggle() }) {
                    Label("\(post.likes)", systemImage: isLiked ? "heart.fill" : "heart")
                        .foregroundColor(isLiked ? .red : .gray)
                }
                Button(action: {}) {
                    Label("\(post.comments)", systemImage: "bubble.right")
                        .foregroundColor(.gray)
                }
                Button(action: {}) {
                    Label("Share", systemImage: "square.and.arrow.up")
                        .foregroundColor(.gray)
                }
            }
            .buttonStyle(.plain)
        }
        .padding()
        .background(Color(.windowBackgroundColor).opacity(0.5))
        .cornerRadius(12)
        .shadow(radius: 1)
    }
}

// Sample data
let samplePosts = [
    Post(user: User(name: "Sarah Johnson", username: "@sarahj", avatar: "👩‍💻", followers: 1234, following: 567),
         content: "Just launched my new tech startup! So excited to share this journey with everyone! 🚀 #TechStartup #Innovation",
         timestamp: "2m ago", likes: 142, comments: 28, isLiked: false),
    Post(user: User(name: "Mike Rivers", username: "@mikedev", avatar: "👨‍💻", followers: 892, following: 345),
         content: "Who else is loving the new SwiftUI updates? The possibilities are endless! 💻 #SwiftUI #iOS",
         timestamp: "15m ago", likes: 89, comments: 15, isLiked: true),
    Post(user: User(name: "Emma Watson", username: "@emmaw", avatar: "👩‍🎨", followers: 2341, following: 890),
         content: "Working on some new designs. Here's a sneak peek of my latest project! ✨ #Design #Creative",
         timestamp: "1h ago", likes: 234, comments: 42, isLiked: false)
]

#Preview {
    HomeView()
}