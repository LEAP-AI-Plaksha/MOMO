import { createContext, useContext, useState, ReactNode } from 'react';

interface FileContextType {
    selectedFile: File | null;
    setSelectedFile: (file: File | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    return (
        <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFile = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFile must be used within a FileProvider');
    }
    return context;
};
