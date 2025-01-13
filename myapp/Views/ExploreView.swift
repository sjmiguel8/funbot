import SwiftUI

struct ExploreView: View {
    @State private var searchText = ""
    let categories = ["Technology", "Design", "Music", "Art", "Sports", "Food", "Travel"]
    
    var body: some View {
        VStack(spacing: 20) {
            // Search bar
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.gray)
                TextField("Explore topics...", text: $searchText)
                    .textFieldStyle(.roundedBorder)
            }
            .padding()
            
            // Categories
            LazyVGrid(columns: Array(repeating: .init(.flexible()), count: 2), spacing: 20) {
                ForEach(categories, id: \.self) { category in
                    CategoryCard(title: category)
                }
            }
            .padding()
            
            Spacer()
        }
    }
}

struct CategoryCard: View {
    let title: String
    
    var body: some View {
        VStack {
            Text(title)
                .font(.title2)
                .bold()
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.accentColor.opacity(0.1))
                .cornerRadius(12)
        }
    }
}