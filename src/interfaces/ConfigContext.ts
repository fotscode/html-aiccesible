interface ConfigContext {
    changesConfig: number; 
    setChangesConfig: React.Dispatch<React.SetStateAction<number>>;
    likes: boolean;
    comments: boolean;
}
