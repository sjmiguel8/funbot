import SwiftUI
import AppKit

struct ImagePicker: View {
    @Binding var image: NSImage?
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        VStack {
            Button("Select Image") {
                let panel = NSOpenPanel()
                panel.allowsMultipleSelection = false
                panel.canChooseDirectories = false
                panel.canChooseFiles = true
                panel.allowedContentTypes = [.image]
                
                if panel.runModal() == .OK {
                    if let url = panel.url {
                        if let selectedImage = NSImage(contentsOf: url) {
                            image = selectedImage
                            dismiss()
                        }
                    }
                }
            }
            .padding()
            
            Button("Cancel") {
                dismiss()
            }
            .padding()
        }
        .frame(width: 300, height: 200)
    }
}

#Preview {
    ImagePicker(image: .constant(nil))
} 