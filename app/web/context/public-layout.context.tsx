import { type ReactNode, createContext, useContext, useState } from "react";

interface PublicLayoutContextType {
	filter: boolean;
	setFilter: (value: boolean) => void;
	toggleFilter: () => void;
	menu: boolean;
	setMenu: (value: boolean) => void;
	toggleMenu: () => void;
}

interface PublicLayoutProviderProps {
	children: ReactNode;
	defaultFilterValue?: boolean;
	defaultMenuValue?: boolean;
}

const PublicLayoutContext = createContext<PublicLayoutContextType | undefined>(
	undefined,
);

export const usePublicLayout = () => {
	const context = useContext(PublicLayoutContext);
	if (!context) {
		throw new Error("usePublicLayout must be used within PublicLayoutProvider");
	}
	return context;
};

export const PublicLayoutProvider = ({
	children,
	defaultFilterValue = false,
	defaultMenuValue = false,
}: PublicLayoutProviderProps) => {
	const [filter, setFilter] = useState(defaultFilterValue);
	const [menu, setMenu] = useState(defaultMenuValue);

	const toggleFilter = () => setFilter((prev) => !prev);
	const toggleMenu = () => setMenu((prev) => !prev);

	return (
		<PublicLayoutContext.Provider
			value={{
				filter,
				setFilter,
				toggleFilter,
				menu,
				setMenu,
				toggleMenu,
			}}
		>
			{children}
		</PublicLayoutContext.Provider>
	);
};
