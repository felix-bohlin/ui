figma.showUI(__html__, { height: 560, themeColors: true, width: 340 })

figma.ui.onmessage = async (message) => {
  if (!message || message.type !== "sync") return
  try {
    const report = await opuiFigmaSync(message.theme, message.options)
    figma.ui.postMessage({ report, type: "done" })
  } catch (error) {
    figma.ui.postMessage({
      message: String((error && error.message) || error),
      type: "error",
    })
  }
}
