@preconcurrency import FirebaseAuth
import SwiftUI

@MainActor
class AuthManager: ObservableObject {
    static let shared = AuthManager()
    
    @Published var user: FirebaseAuth.User?
    @Published var isAuthenticated = false
    @Published var errorMessage: String?
    
    private init() {
        user = Auth.auth().currentUser
        isAuthenticated = user != nil
    }
    
    func signIn(email: String, password: String) async throws {
        do {
            let result = try await Auth.auth().signIn(withEmail: email, password: password)
            self.user = result.user
            self.isAuthenticated = true
            self.errorMessage = nil
        } catch {
            self.errorMessage = error.localizedDescription
            throw error
        }
    }
    
    func signUp(email: String, password: String, username: String) async throws {
        do {
            print("Starting signup for email: \(email)")
            
            let result = try await Auth.auth().createUser(withEmail: email, password: password)
            print("User created with ID: \(result.user.uid)")
            
            let user = Models.User(
                id: result.user.uid,
                name: username,
                username: username,
                avatar: "👤"
            )
            try await FirestoreManager.shared.createUserProfile(user)
            print("User profile created in Firestore")
            
            self.user = result.user
            self.isAuthenticated = true
            self.errorMessage = nil
            
        } catch let error as NSError {
            print("Signup error: \(error.localizedDescription)")
            print("Error domain: \(error.domain)")
            print("Error code: \(error.code)")
            print("Error user info: \(error.userInfo)")
            self.errorMessage = error.localizedDescription
            throw error
        }
    }
    
    func signOut() throws {
        do {
            try Auth.auth().signOut()
            self.user = nil
            self.isAuthenticated = false
            self.errorMessage = nil
        } catch {
            self.errorMessage = error.localizedDescription
            throw error
        }
    }
} 