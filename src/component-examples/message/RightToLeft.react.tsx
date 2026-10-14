import { Avatar, Message, Messages } from "opui-css/react"

const picker = [
  { emoji: "👍", label: "إعجاب", value: "+1" },
  { emoji: "❤️", label: "قلب", value: "heart" },
  { emoji: "😂", label: "ضحك", value: "joy" },
  { emoji: "🎉", label: "احتفال", value: "tada" },
  { emoji: "👀", label: "عيون", value: "eyes" },
]

export default function RightToLeft() {
  return (
    <Messages dir="rtl" label="رسائل فريق التصميم" lang="ar">
      <Message
        author="ليلى"
        avatar={
          <Avatar aria-label="ليلى" role="img">
            لي
          </Avatar>
        }
        datetime="2026-10-08T09:12"
        time="09:12"
      >
        <p>الأيقونات الجديدة جاهزة.</p>
      </Message>
      <Message
        author="ليلى"
        avatar={
          <Avatar aria-label="ليلى" role="img">
            لي
          </Avatar>
        }
        datetime="2026-10-08T09:13"
        picker={picker}
        pickerLabel="إضافة تفاعل"
        reactions={[
          {
            count: 2,
            emoji: "👍",
            label: "إعجاب، شخص آخر",
            mine: true,
            value: "+1",
          },
        ]}
        reactionsLabel="التفاعلات"
        time="09:13"
      >
        <p>هل نراجعها اليوم؟</p>
      </Message>
      <Message author="أنت" datetime="2026-10-08T09:20" outgoing time="09:20">
        <p>نعم، بعد الظهر.</p>
      </Message>
    </Messages>
  )
}
