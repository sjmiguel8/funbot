//
//  MyApp.swift
//  myapp
//
//  Created by Miguel Bonilla on 1/11/25.
//

import SwiftUI
import FirebaseCore
import FirebaseFirestore
import FirebaseAuth

@main
struct MyApp: App {
    init() {
        // Configure Firebase
        FirebaseConfig.configure()
    }
    
    var body: some Scene {
        WindowGroup {
            HomeView()
        }
    }
}
