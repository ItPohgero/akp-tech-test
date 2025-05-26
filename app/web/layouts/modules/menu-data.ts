import type { MenuType } from "@/web/types/public-menu.type";

const DataAllCategory: MenuType = {
	title: "All Categories",
	data: [
		{
			name: "All Categories",
			description:
				"Browse our complete range of products across all industries",
			subcategories: [
				{
					label: "Machinery & Equipment",
					link: "/machinery-equipment",
				},
				{
					label: "Electronics & Electrical",
					link: "/electronics-electrical",
				},
				{
					label: "Textiles & Apparel",
					link: "/textiles-apparel",
				},
				{
					label: "Home & Garden",
					link: "/home-garden",
				},
				{
					label: "Construction & Real Estate",
					link: "/construction-real-estate",
				},
				{
					label: "Automotive & Transportation",
					link: "/automotive-transportation",
				},
				{
					label: "Chemical & Materials",
					link: "/chemical-materials",
				},
				{
					label: "Food & Agriculture",
					link: "/food-agriculture",
				},
				{
					label: "Health & Medical",
					link: "/health-medical",
				},
				{
					label: "Sports & Entertainment",
					link: "/sports-entertainment",
				},
				{
					label: "Security & Protection",
					link: "/security-protection",
				},
				{
					label: "Packaging & Printing",
					link: "/packaging-printing",
				},
			],
		},
	],
	footer: {
		title: "Industry Categories",
		description: "Find suppliers and manufacturers worldwide",
	},
};

const DataPopularProduct: MenuType = {
	title: "Popular Products",
	data: [
		{
			name: "Hot Selling Products",
			description: "Trending products with high demand from global buyers",
			subcategories: [
				{
					label: "LED Lights & Lighting",
					link: "/led-lights-lighting",
				},
				{
					label: "Solar Panels & Equipment",
					link: "/solar-panels-equipment",
				},
				{
					label: "Mobile Phone Accessories",
					link: "/mobile-phone-accessories",
				},
				{
					label: "Face Masks & PPE",
					link: "/face-masks-ppe",
				},
				{
					label: "Packaging Machinery",
					link: "/packaging-machinery",
				},
				{
					label: "Electric Vehicles",
					link: "/electric-vehicles",
				},
				{
					label: "Furniture Hardware",
					link: "/furniture-hardware",
				},
				{
					label: "Building Materials",
					link: "/building-materials",
				},
			],
		},
		{
			name: "New Arrivals",
			description: "Latest products from verified suppliers",
			subcategories: [
				{
					label: "Smart Home Devices",
					link: "/smart-home-devices",
				},
				{
					label: "3D Printing Equipment",
					link: "/3d-printing-equipment",
				},
				{
					label: "Eco-Friendly Packaging",
					link: "/eco-friendly-packaging",
				},
				{
					label: "Industrial Robots",
					link: "/industrial-robots",
				},
			],
		},
	],
	footer: {
		title: "Featured Suppliers",
		description: "Connect with verified manufacturers and wholesalers",
	},
};

export const MenuData = {
	DataAllCategory,
	DataPopularProduct,
};
