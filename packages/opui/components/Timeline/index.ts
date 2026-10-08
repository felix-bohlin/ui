import Timeline from "./Timeline.astro"
import TimelineItem from "./TimelineItem.astro"

export { TimelineItem as Item }

export default Object.assign(Timeline, {
  Item: TimelineItem,
})
