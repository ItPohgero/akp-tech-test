import { createContext, useContext, useState, type ReactNode } from "react";

interface PublicLayoutContextType {
    filter: boolean;
    setFilter: (value: boolean) => void;
    toggleFilter: () => void;
}

interface PublicLayoutProviderProps {
    children: ReactNode;
    defaultValue?: boolean;
}

const PublicLayoutContext = createContext<PublicLayoutContextType | undefined>(undefined);

export const usePublicLayout = () => {
    const context = useContext(PublicLayoutContext);
    if (!context) {
        throw new Error("usePublicLayout must be used within PublicLayoutProvider");
    }
    return context;
};


export const PublicLayoutProvider = ({ children, defaultValue = false }: PublicLayoutProviderProps) => {
    const [filter, setFilter] = useState(defaultValue);
    const toggleFilter = () => setFilter(prev => !prev);

    return (
        <PublicLayoutContext.Provider value={{ filter, setFilter, toggleFilter }}>
            {children}
        </PublicLayoutContext.Provider>
    );
};