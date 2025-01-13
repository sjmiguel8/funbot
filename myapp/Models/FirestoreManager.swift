import SwiftUI
import FirebaseFirestore
import FirebaseCore
import FirebaseAuth

class FirestoreManager: ObservableObject {
    static let shared = FirestoreManager()
    private let db = Firestore.firestore()
    @Published var posts: [Models.Post] = []
    
    private init() {}
    
    func fetchPosts() async throws {
        let snapshot = try await db.collection("posts")
            .order(by: "timestamp", descending: true)
            .getDocuments()
        
        self.posts = snapshot.documents.compactMap { document in
            return Models.Post(dictionary: document.data(), id: document.documentID)
        }
    }
    
    func addPost(_ content: String, user: Models.User) async throws {
        let docRef = db.collection("posts").document()
        let post = Models.Post(
            id: docRef.documentID,
            user: user,
            content: content,
            timestamp: Date().formatted()
        )
        try await docRef.setData(post.toDictionary())
    }
    
    func likePost(_ post: Models.Post) async throws {
        try await db.collection("posts").document(post.id).updateData([
            "likes": FieldValue.increment(Int64(1)),
            "isLiked": true
        ])
    }
    
    func unlikePost(_ post: Models.Post) async throws {
        try await db.collection("posts").document(post.id).updateData([
            "likes": FieldValue.increment(Int64(-1)),
            "isLiked": false
        ])
    }
    
    func createUserProfile(_ user: Models.User) async throws {
        try await db.collection("users").document(user.id).setData(user.toDictionary())
    }
} 