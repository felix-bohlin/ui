<script lang="ts">
  import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    TextField,
    Textarea,
  } from "opui-css/svelte"
  import { untrack } from "svelte"

  type Profile = { bio: string; name: string }

  let { bio, name, onsave }: Profile & { onsave: (profile: Profile) => void } =
    $props()

  let draft = $state(untrack(() => ({ bio, name })))
</script>

<Dialog id="edit-profile" onclose={() => (draft = { bio, name })}>
  <DialogHeader closeButton>
    <DialogTitle>Edit profile</DialogTitle>
  </DialogHeader>
  <form method="dialog" onsubmit={() => onsave({ ...draft })}>
    <DialogContent>
      <TextField for="profile-name" label="Name">
        <input bind:value={draft.name} id="profile-name" name="name" required />
      </TextField>
      <Textarea bind:value={draft.bio} label="Bio" name="bio" />
    </DialogContent>
    <DialogFooter>
      <Button command="close" commandfor="edit-profile">Cancel</Button>
      <Button type="submit" variant="filled">Save</Button>
    </DialogFooter>
  </form>
</Dialog>
