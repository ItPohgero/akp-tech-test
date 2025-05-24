import prisma from "@/server/pkg/prisma-client";
import { Decimal } from "@prisma/client/runtime/library";

// File: prisma/seed.js
const productsData = [
	{
		sku: "IPH-XR-64GB-ORI",
		slug: "iphone-xr-64gb-original-unlocked",
		name: "Brand Original 6.1inch 256GB Wholesale Unlocked Second Hand iPhone XR",
		description:
			"Original Apple iPhone XR with 6.1 inch display, 256GB storage capacity. Wholesale unlocked second hand device in excellent condition. Available in multiple colors including red, white, black, blue, and coral.",
		price: new Decimal("89.00"),
		imageUrl:
			"https://s.alicdn.com/@sc04/kf/H3d6ff58cde464a45b76e2056db77562ev.jpg_720x720q50.jpg",
		stockQuantity: 150,
		minimumOrderQuantity: 5,
	},
	{
		sku: "GPX-9-UNL-5G",
		slug: "google-pixel-9-unlocked-android-5g",
		name: "For Google Pixel 9 Used Mobile Phone Unlocked Android 5G Original Brand",
		description:
			"Google Pixel 9 unlocked Android smartphone with 5G connectivity. Original brand device with advanced camera system and pure Android experience. Perfect for wholesale buyers.",
		price: new Decimal("460.50"),
		imageUrl:
			"https://s.alicdn.com/@sc04/kf/Ha46a96947a1e4f0b825a1415fd3670e3p.jpg_720x720q50.jpg",
		stockQuantity: 80,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-XR-64GB-HOT",
		slug: "hot-sale-iphone-xr-64gb-128gb-original",
		name: "Hot Sale XR 64gb 128gb Original Unlocked Used Mobile 100% USA Original",
		description:
			"Hot sale iPhone XR available in 64GB and 128GB variants. 100% USA original device, unlocked and ready to use. Premium quality used mobile phone with excellent performance.",
		price: new Decimal("134.00"),
		imageUrl:
			"https://s.alicdn.com/@sc04/kf/He86981cab7c341a3a6255a582a44a706X.jpg_720x720q50.jpg",
		stockQuantity: 200,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-13PM-5G-WHL",
		slug: "wholesale-2024-iphone-13-pro-max-unlocked",
		name: "Wholesale 2024 13 Pro Max Unlocked Original 5G LTE Cheap Second Hand",
		description:
			"iPhone 13 Pro Max wholesale device with 5G LTE connectivity. Original unlocked smartphone at competitive wholesale prices. Perfect for bulk buyers and resellers.",
		price: new Decimal("419.50"),
		imageUrl:
			"https://s.alicdn.com/@sc04/kf/He50172ae5200459eb333c86c2cc1bda47.jpg_720x720q50.jpg",
		stockQuantity: 120,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-14PM-BLU-UNL",
		slug: "iphone-14-pro-max-blue-unlocked",
		name: "iPhone 14 Pro Max 256GB Blue Unlocked Original",
		description:
			"Latest iPhone 14 Pro Max in stunning blue color with 256GB storage. Unlocked device with advanced Pro camera system and A16 Bionic chip for ultimate performance.",
		price: new Decimal("899.00"),
		imageUrl:
			"https://s.alicdn.com/@sc04/kf/H36a4718ee4594666b60f27c9fc857001d.jpg_720x720q50.jpg",
		stockQuantity: 50,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-15P-TIT-512",
		slug: "iphone-15-pro-titanium-512gb",
		name: "iPhone 15 Pro 512GB Natural Titanium Unlocked",
		description:
			"Revolutionary iPhone 15 Pro with Natural Titanium finish and 512GB storage. Features the powerful A17 Pro chip, advanced camera system, and premium titanium construction.",
		price: new Decimal("1199.00"),
		imageUrl:
			"https://s.alicdn.com/@sc04/kf/Ha253f95222ed4a188d2dd904d37497c0C.jpg_720x720q50.jpg",
		stockQuantity: 30,
		minimumOrderQuantity: 1,
	},
];

async function main() {
	console.log("🌱 Starting seeding process...");

	try {
		// Clear existing products (optional)
		console.log("🗑️  Clearing existing products...");
		await prisma.product.deleteMany({});

		// Insert new products
		console.log("📱 Inserting products...");

		for (const product of productsData) {
			const createdProduct = await prisma.product.create({
				data: product,
			});
			console.log(`✅ Created product: ${createdProduct.name}`);
		}

		console.log(`🎉 Successfully seeded ${productsData.length} products!`);

		// Display summary
		const totalProducts = await prisma.product.count();
		console.log(`📊 Total products in database: ${totalProducts}`);
	} catch (error) {
		console.error("❌ Error during seeding:", error);
		throw error;
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log("🔌 Database connection closed");
	});
