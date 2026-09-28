// Renders every page of a PDF to PNG with PDFKit (macOS only; used by scripts/render-notes.mjs).
// Usage: swift scripts/render-pdf-page.swift <in.pdf> <outDir> <targetWidthPx>
// Writes <outDir>/p-001.png, p-002.png, ... and prints the page count.
import AppKit
import PDFKit

let args = CommandLine.arguments
guard args.count == 4,
      let doc = PDFDocument(url: URL(fileURLWithPath: args[1])),
      let targetWidth = Double(args[3]) else {
  FileHandle.standardError.write("usage: <in.pdf> <outDir> <width>\n".data(using: .utf8)!)
  exit(2)
}

let outDir = URL(fileURLWithPath: args[2], isDirectory: true)
try FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)

for i in 0..<doc.pageCount {
  guard let page = doc.page(at: i) else { continue }
  let bounds = page.bounds(for: .mediaBox)
  let scale = targetWidth / bounds.width
  let w = Int(bounds.width * scale), h = Int(bounds.height * scale)

  guard let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h,
                                   bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                                   colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0),
        let ctx = NSGraphicsContext(bitmapImageRep: rep) else { exit(4) }

  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = ctx
  NSColor.white.setFill()
  NSRect(x: 0, y: 0, width: w, height: h).fill()
  ctx.cgContext.scaleBy(x: scale, y: scale)
  page.draw(with: .mediaBox, to: ctx.cgContext)
  NSGraphicsContext.restoreGraphicsState()

  guard let png = rep.representation(using: .png, properties: [:]) else { exit(5) }
  try png.write(to: outDir.appendingPathComponent(String(format: "p-%03d.png", i + 1)))
}
print(doc.pageCount)
