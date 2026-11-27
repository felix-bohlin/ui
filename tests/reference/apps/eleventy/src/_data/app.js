import * as shared from "reference-shared"

export default {
  ...shared,
  conversationList: shared.conversations(),
  notificationItems: shared.NOTIFICATIONS.map(({ href, text }) => ({
    href,
    label: text,
  })),
  viewerPhotos: shared.PHOTOS.map(({ alt, by, src }) => ({
    alt,
    by: shared.user(by).name,
    src,
  })),
}
