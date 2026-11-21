<script setup lang="ts">
import {
  Button,
  List,
  ListItem,
  Message,
  MessageList,
  Textarea,
} from "opui-css/vue"
import {
  ME,
  conversation,
  conversations,
  outgoing,
  user,
} from "reference-shared"

useHead({ title: "Chat" })

const route = useRoute()
const sent = useSentMessages()
const all = conversations()
const open = computed(() =>
  conversation(typeof route.query.with === "string" ? route.query.with : null),
)
const lines = computed(() => [
  ...open.value.lines,
  ...(sent.value[open.value.with] ?? []),
])
const text = ref("")

const send = () => {
  const mine = sent.value[open.value.with] ?? []
  sent.value[open.value.with] = [...mine, outgoing(text.value, mine.length)]
  text.value = ""
}
</script>

<template>
  <div class="app-screen" data-screen="chat">
    <h1>Chat</h1>
    <div class="app-chat">
      <nav aria-label="Conversations">
        <List variant="transparent">
          <NuxtLink
            v-for="item in all"
            :key="item.with"
            v-slot="{ navigate }"
            custom
            :to="`/chat?with=${item.with}`"
          >
            <ListItem
              :aria-current="item.with === open.with ? 'page' : undefined"
              :description="item.unread ? `${item.unread} unread` : undefined"
              :href="`/chat?with=${item.with}`"
              :label="item.user.name"
              @click="navigate"
            >
              <template #start>
                <UserAvatar size="small" :user="item.user" />
              </template>
            </ListItem>
          </NuxtLink>
        </List>
      </nav>
      <section aria-labelledby="chat-title" class="app-screen">
        <h2 id="chat-title">{{ open.user.name }}</h2>
        <MessageList :aria-label="`Messages with ${open.user.name}`" direct>
          <template v-for="(line, index) in lines" :key="index">
            <li v-if="line.kind === 'divider'" class="ui-divider">
              {{ line.label }}
            </li>
            <Message
              v-else
              :author="user(line.from)!.name"
              :datetime="line.datetime"
              :outgoing="line.from === ME"
              :time="line.time"
            >
              <template v-if="line.from !== ME" #start>
                <UserAvatar size="small" :user="user(line.from)!" />
              </template>
              <p>{{ line.text }}</p>
            </Message>
          </template>
        </MessageList>
        <form
          aria-label="Send a message"
          class="ui-layout-column"
          @submit.prevent="send"
        >
          <Textarea for="chat-message" hideLabel label="Message">
            <textarea
              id="chat-message"
              name="text"
              required
              v-model="text"
            ></textarea>
          </Textarea>
          <div>
            <Button type="submit" variant="filled">Send</Button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
