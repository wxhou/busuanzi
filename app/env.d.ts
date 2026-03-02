/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_KEY: string
  readonly NEXT_PUBLIC_API_BASE_URL: string
  readonly NEXT_PUBLIC_MODEL_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
