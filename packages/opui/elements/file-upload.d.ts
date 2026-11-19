export type RemoveDetail = {
  value: string
}

export type SelectDetail = {
  files: File[]
}

export declare class FileUploadElement extends HTMLElement {
  readonly input: HTMLInputElement | null
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-file-upload": FileUploadElement
  }
}
