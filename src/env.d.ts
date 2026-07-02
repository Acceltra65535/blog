interface ImportMetaEnv {
    readonly VITE_BUILD_VERSION?: string;
    readonly VITE_BUILD_COMMIT_ID?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}