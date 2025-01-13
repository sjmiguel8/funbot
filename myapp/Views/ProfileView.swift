import SwiftUI

struct ProfileView: View {
    @State private var selectedTab = "posts"
    
    // Sample user posts
    let userPosts = [
        Post(user: User(name: "John Doe", username: "@johndoe", avatar: "👤", followers: 1234, following: 567),
             content: "Working on some exciting new features! Can't wait to share them with you all! 💻 #Coding #SwiftUI",
             timestamp: "1h ago", likes: 45, comments: 12, isLiked: false),
        Post(user: User(name: "John Doe", username: "@johndoe", avatar: "👤", followers: 1234, following: 567),
             content: "Just completed another milestone! 🎉 #Achievement #Developer",
             timestamp: "3h ago", likes: 89, comments: 23, isLiked: true),
        Post(user: User(name: "John Doe", username: "@johndoe", avatar: "👤", followers: 1234, following: 567),
             content: "Thanks everyone for the amazing support! 🙏 #Grateful",
             timestamp: "1d ago", likes: 156, comments: 34, isLiked: false)
    ]
    
    var body: some View {
        VStack(spacing: 0) {
            // Profile header
            VStack {
                Image(systemName: "person.circle.fill")
                    .font(.system(size: 80))
                    .foregroundColor(.accentColor)
                
                Text("John Doe")
                    .font(.title)
                    .bold()
                
                Text("@johndoe")
                    .foregroundColor(.gray)
                
                // Stats
                HStack(spacing: 40) {
                    VStack {
                        Text("Posts")
                            .bold()
                        Text("123")
                    }
                    VStack {
                        Text("Following")
                            .bold()
                        Text("456")
                    }
                    VStack {
                        Text("Followers")
                            .bold()
                        Text("789")
                    }
                }
                .padding(.top)
            }
            .padding()
            .background(Color.white)
            
            // Content tabs
            Picker("Content", selection: $selectedTab) {
                Text("Posts").tag("posts")
                Text("Media").tag("media")
                Text("Likes").tag("likes")
            }
            .pickerStyle(.segmented)
            .padding()
            
            // Content area
            ScrollView {
                LazyVStack(spacing: 15) {
                    ForEach(userPosts) { post in
                        PostCard(post: post)
                            .padding(.horizontal)
                    }
                }
                .padding()
            }
        }
    }
}

#Preview {
    ProfileView()
} 