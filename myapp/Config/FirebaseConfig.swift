import Foundation
import FirebaseCore

struct FirebaseConfig {
    static func configure() {
        guard FirebaseApp.app() == nil else { return }
        
        // Debug prints
        print("Starting Firebase configuration...")
        
        // Load configuration from GoogleService-Info.plist
        if let filePath = Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist") {
            print("Found plist at: \(filePath)")
            if let dict = NSDictionary(contentsOfFile: filePath) as? [String: Any] {
                print("API Key exists: \(dict["API_KEY"] != nil)")
                print("Project ID exists: \(dict["PROJECT_ID"] != nil)")
                print("Client ID exists: \(dict["CLIENT_ID"] != nil)")
            }
            
            if let options = FirebaseOptions(contentsOfFile: filePath) {
                FirebaseApp.configure(options: options)
                print("Firebase configured successfully")
            } else {
                print("⚠️ Failed to create Firebase options")
            }
        } else {
            print("⚠️ Couldn't find GoogleService-Info.plist")
            fatalError("Couldn't load GoogleService-Info.plist")
        }
    }
} 