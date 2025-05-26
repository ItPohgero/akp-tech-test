export type MenuType = {
	title: string;
	data: {
		name: string;
		description: string;
		subcategories: {
			label: string;
			link: string;
		}[];
	}[];
	footer?: {
		title: string;
		description: string;
	};
};
