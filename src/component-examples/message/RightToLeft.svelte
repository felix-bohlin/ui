<script lang="ts">
  import { Avatar, Message, Messages } from "opui-css/svelte"

  const picker = [
    { emoji: "👍", label: "إعجاب", value: "+1" },
    { emoji: "❤️", label: "قلب", value: "heart" },
    { emoji: "😂", label: "ضحك", value: "joy" },
    { emoji: "🎉", label: "احتفال", value: "tada" },
    { emoji: "👀", label: "عيون", value: "eyes" },
  ]
</script>

<Messages dir="rtl" label="رسائل فريق التصميم" lang="ar">
  <Message author="ليلى" datetime="2026-10-08T09:12" time="09:12">
    {#snippet avatar()}
      <Avatar aria-label="ليلى" role="img">لي</Avatar>
    {/snippet}
    <p>الأيقونات الجديدة جاهزة.</p>
  </Message>
  <Message
    author="ليلى"
    datetime="2026-10-08T09:13"
    {picker}
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
    {#snippet avatar()}
      <Avatar aria-label="ليلى" role="img">لي</Avatar>
    {/snippet}
    <p>هل نراجعها اليوم؟</p>
  </Message>
  <Message author="أنت" datetime="2026-10-08T09:20" outgoing time="09:20">
    <p>نعم، بعد الظهر.</p>
  </Message>
</Messages>
