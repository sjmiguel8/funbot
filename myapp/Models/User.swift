import Foundation

extension Models {
    struct User: Identifiable {
        let id: String
        let name: String
        let username: String
        let avatar: String
        let followers: Int
        let following: Int
        
        init(id: String = UUID().uuidString,
             name: String,
             username: String,
             avatar: String,
             followers: Int = 0,
             following: Int = 0) {
            self.id = id
            self.name = name
            self.username = username
            self.avatar = avatar
            self.followers = followers
            self.following = following
        }
        
        init?(dictionary: [String: Any]) {
            guard let name = dictionary["name"] as? String,
                  let username = dictionary["username"] as? String,
                  let avatar = dictionary["avatar"] as? String,
                  let followers = dictionary["followers"] as? Int,
                  let following = dictionary["following"] as? Int else {
                return nil
            }
            
            self.id = dictionary["id"] as? String ?? UUID().uuidString
            self.name = name
            self.username = username
            self.avatar = avatar
            self.followers = followers
            self.following = following
        }
        
        func toDictionary() -> [String: Any] {
            return [
                "id": id,
                "name": name,
                "username": username,
                "avatar": avatar,
                "followers": followers,
                "following": following
            ]
        }
    }
} 