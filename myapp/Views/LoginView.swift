import SwiftUI

struct LoginView: View {
    @StateObject private var authManager = AuthManager.shared
    @State private var email = ""
    @State private var password = ""
    @State private var username = ""
    @State private var isSignUp = false
    
    var body: some View {
        VStack(spacing: 20) {
            Text(isSignUp ? "Create Account" : "Welcome Back")
                .font(.title)
                .bold()
            
            VStack(spacing: 15) {
                TextField("Email", text: $email)
                    .textFieldStyle(.roundedBorder)
                    .frame(maxWidth: 300)
                
                if isSignUp {
                    TextField("Username", text: $username)
                        .textFieldStyle(.roundedBorder)
                        .frame(maxWidth: 300)
                }
                
                SecureField("Password", text: $password)
                    .textFieldStyle(.roundedBorder)
                    .frame(maxWidth: 300)
                
                if let errorMessage = authManager.errorMessage {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .font(.caption)
                }
                
                Button(action: {
                    Task {
                        do {
                            if isSignUp {
                                try await authManager.signUp(email: email, password: password, username: username)
                            } else {
                                try await authManager.signIn(email: email, password: password)
                            }
                        } catch {
                            print("Authentication error: \(error)")
                        }
                    }
                }) {
                    Text(isSignUp ? "Sign Up" : "Sign In")
                        .frame(maxWidth: 300)
                        .padding()
                        .background(Color.accentColor)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                
                Button(action: { isSignUp.toggle() }) {
                    Text(isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up")
                        .foregroundColor(.accentColor)
                }
            }
            .padding(.horizontal)
        }
        .frame(width: 400, height: 400)
        .padding()
    }
}

#Preview {
    LoginView()
} 