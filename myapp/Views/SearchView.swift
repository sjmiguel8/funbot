import SwiftUI

struct SearchView: View {
    @Binding var searchText: String
    @State private var selectedCategory = "posts"
    
    // Sample search posts
    let searchPosts = [
        Post(user: User(name: "Sarah Johnson", username: "@sarahj", avatar: "👩‍💻", followers: 1234, following: 567),
             content: "Just launched my new tech startup! 🚀 #TechStartup #Innovation",
             timestamp: "2m ago", likes: 142, comments: 28, isLiked: false),
        Post(user: User(name: "Mike Rivers", username: "@mikedev", avatar: "👨‍💻", followers: 892, following: 345),
             content: "Who else is loving the new SwiftUI updates? 💻 #SwiftUI #iOS",
             timestamp: "15m ago", likes: 89, comments: 15, isLiked: true),
        Post(user: User(name: "Emma Watson", username: "@emmaw", avatar: "👩‍🎨", followers: 2341, following: 890),
             content: "Working on some new designs. ✨ #Design #Creative",
             timestamp: "1h ago", likes: 234, comments: 42, isLiked: false)
    ]
    
    var body: some View {
        VStack {
            // Search categories
            Picker("Category", selection: $selectedCategory) {
                Text("Posts").tag("posts")
                Text("People").tag("people")
                Text("Tags").tag("tags")
            }
            .pickerStyle(.segmented)
            .padding()
            
            ScrollView {
                LazyVStack(spacing: 15) {
                    switch selectedCategory {
                    case "posts":
                        ForEach(searchPosts) { post in
                            PostCard(post: post)
                        }
                    case "people":
                        ForEach(0..<5) { _ in
                            UserRow()
                        }
                    case "tags":
                        ForEach(0..<5) { _ in
                            TagRow()
                        }
                    default:
                        EmptyView()
                    }
                }
                .padding()
            }
        }
    }
}

struct UserRow: View {
    var body: some View {
        HStack {
            Image(systemName: "person.circle.fill")
                .font(.title)
            VStack(alignment: .leading) {
                Text("User Name")
                    .fontWeight(.bold)
                Text("@username")
                    .foregroundColor(.gray)
            }
            Spacer()
            Button("Follow") {
                // Follow action
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
        .background(Color.white)
        .cornerRadius(12)
    }
}

struct TagRow: View {
    var body: some View {
        HStack {
            Text("#swiftui")
                .fontWeight(.bold)
            Spacer()
            Text("1.2K posts")
                .foregroundColor(.gray)
        }
        .padding()
        .background(Color.white)
        .cornerRadius(12)
    }
}

#Preview {
    SearchView(searchText: .constant(""))
} 
