import Foundation

// Add a namespace to avoid ambiguity
enum Models {
    struct Post: Identifiable {
        let id: String
        let user: User
        let content: String
        let timestamp: String
        let likes: Int
        let comments: Int
        var isLiked: Bool
        
        init(id: String = UUID().uuidString,
             user: User,
             content: String,
             timestamp: String,
             likes: Int = 0,
             comments: Int = 0,
             isLiked: Bool = false) {
            self.id = id
            self.user = user
            self.content = content
            self.timestamp = timestamp
            self.likes = likes
            self.comments = comments
            self.isLiked = isLiked
        }
        
        init?(dictionary: [String: Any], id: String) {
            guard let user = dictionary["user"] as? [String: Any],
                  let content = dictionary["content"] as? String,
                  let timestamp = dictionary["timestamp"] as? String,
                  let likes = dictionary["likes"] as? Int,
                  let comments = dictionary["comments"] as? Int,
                  let isLiked = dictionary["isLiked"] as? Bool else {
                return nil
            }
            
            guard let parsedUser = User(dictionary: user) else {
                return nil
            }
            
            self.id = id
            self.user = parsedUser
            self.content = content
            self.timestamp = timestamp
            self.likes = likes
            self.comments = comments
            self.isLiked = isLiked
        }
        
        func toDictionary() -> [String: Any] {
            return [
                "user": user.toDictionary(),
                "content": content,
                "timestamp": timestamp,
                "likes": likes,
                "comments": comments,
                "isLiked": isLiked
            ]
        }
    }
}