import prisma from "@/server/pkg/prisma-client";
import slugify from "@/server/utils/slugify";
import { Decimal } from "@prisma/client/runtime/library";
import { nanoid } from "nanoid";

const IMG = [
	"https://s.alicdn.com/@sc04/kf/H3d6ff58cde464a45b76e2056db77562ev.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/Ha46a96947a1e4f0b825a1415fd3670e3p.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/H3d6ff58cde464a45b76e2056db77562ev.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/He86981cab7c341a3a6255a582a44a706X.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/H36a4718ee4594666b60f27c9fc857001d.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/H0b304623219a4a759a0e98fec928f6695.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/H86552df87b894cfc997a56603f5f0e39j.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/Hb5483f5d55b1493a8cf81dbdb5bf7f14Y.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/H4deb5bb71df34ae1ad6c9e91016e8d27x.jpg_720x720q50.jpg",
	"https://s.alicdn.com/@sc04/kf/H70ac05f8be52450994216c972e8c3ec0C.jpg_720x720q50.jpg",
];

const productsData = [
	{
		sku: "IPH-XR-64GB-ORI",
		name: "Brand Original 6.1inch 256GB Wholesale Unlocked Second Hand iPhone XR",
		description:
			"Original Apple iPhone XR with 6.1 inch display, 256GB storage capacity. Wholesale unlocked second hand device in excellent condition. Available in multiple colors including red, white, black, blue, and coral.",
		price: new Decimal("89.00"),
		imageUrl: IMG[0],
		stockQuantity: 150,
		minimumOrderQuantity: 5,
	},
	{
		sku: "GPX-9-UNL-5G",
		name: "For Google Pixel 9 Used Mobile Phone Unlocked Android 5G Original Brand",
		description:
			"Google Pixel 9 unlocked Android smartphone with 5G connectivity. Original brand device with advanced camera system and pure Android experience. Perfect for wholesale buyers.",
		price: new Decimal("460.50"),
		imageUrl: IMG[1],
		stockQuantity: 80,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-XR-64GB-HOT",
		name: "Hot Sale XR 64gb 128gb Original Unlocked Used Mobile 100% USA Original",
		description:
			"Hot sale iPhone XR available in 64GB and 128GB variants. 100% USA original device, unlocked and ready to use. Premium quality used mobile phone with excellent performance.",
		price: new Decimal("134.00"),
		imageUrl: IMG[2],
		stockQuantity: 200,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-13PM-5G-WHL",
		name: "Wholesale 2024 13 Pro Max Unlocked Original 5G LTE Cheap Second Hand",
		description:
			"iPhone 13 Pro Max wholesale device with 5G LTE connectivity. Original unlocked smartphone at competitive wholesale prices. Perfect for bulk buyers and resellers.",
		price: new Decimal("419.50"),
		imageUrl: IMG[3],
		stockQuantity: 120,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-14PM-BLU-UNL",
		name: "iPhone 14 Pro Max 256GB Blue Unlocked Original",
		description:
			"Latest iPhone 14 Pro Max in stunning blue color with 256GB storage. Unlocked device with advanced Pro camera system and A16 Bionic chip for ultimate performance.",
		price: new Decimal("899.00"),
		imageUrl: IMG[4],
		stockQuantity: 50,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-15P-TIT-512",
		name: "iPhone 15 Pro 512GB Natural Titanium Unlocked",
		description:
			"Revolutionary iPhone 15 Pro with Natural Titanium finish and 512GB storage. Features the powerful A17 Pro chip, advanced camera system, and premium titanium construction.",
		price: new Decimal("1199.00"),
		imageUrl: IMG[5],
		stockQuantity: 30,
		minimumOrderQuantity: 1,
	},
	{
		sku: "SAM-S24U-BLK-512",
		name: "Samsung Galaxy S24 Ultra 512GB Black Unlocked 5G",
		description:
			"Samsung Galaxy S24 Ultra with S Pen, 512GB storage in elegant black. Features advanced AI photography, 200MP camera, and premium build quality. Unlocked for all carriers.",
		price: new Decimal("1089.00"),
		imageUrl: IMG[6],
		stockQuantity: 45,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-12-GRN-128",
		name: "iPhone 12 128GB Green Refurbished Unlocked",
		description:
			"iPhone 12 in beautiful green color with 128GB storage. Professionally refurbished with excellent condition. Features A14 Bionic chip and dual camera system.",
		price: new Decimal("329.00"),
		imageUrl: IMG[7],
		stockQuantity: 180,
		minimumOrderQuantity: 2,
	},
	{
		sku: "GPX-8P-WHT-256",
		name: "Google Pixel 8 Pro 256GB White Unlocked Original",
		description:
			"Google Pixel 8 Pro with pure Android experience and Google AI features. 256GB storage in pristine white finish. Advanced computational photography and 5G connectivity.",
		price: new Decimal("679.00"),
		imageUrl: IMG[8],
		stockQuantity: 65,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-11-PUR-64",
		name: "iPhone 11 64GB Purple Used Wholesale Grade A",
		description:
			"iPhone 11 in stunning purple color with 64GB storage. Grade A used condition with minimal wear. Dual camera system and all-day battery life. Perfect for wholesale.",
		price: new Decimal("199.00"),
		imageUrl: IMG[9],
		stockQuantity: 250,
		minimumOrderQuantity: 3,
	},
	{
		sku: "SAM-S23-GLD-256",
		name: "Samsung Galaxy S23 256GB Gold Unlocked Refurbished",
		description:
			"Samsung Galaxy S23 in luxurious gold finish with 256GB storage. Professionally refurbished with Snapdragon 8 Gen 2 processor and advanced camera system.",
		price: new Decimal("549.00"),
		imageUrl: IMG[0],
		stockQuantity: 90,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-13-BLU-512",
		name: "iPhone 13 512GB Blue Factory Unlocked Original",
		description:
			"iPhone 13 with massive 512GB storage in beautiful blue color. Factory unlocked with A15 Bionic chip and advanced dual camera system. Excellent battery life.",
		price: new Decimal("629.00"),
		imageUrl: IMG[1],
		stockQuantity: 110,
		minimumOrderQuantity: 1,
	},
	{
		sku: "GPX-7A-BLK-128",
		name: "Google Pixel 7a 128GB Black Budget Android 5G",
		description:
			"Google Pixel 7a offering flagship features at budget price. 128GB storage in classic black. Google Tensor G2 chip and excellent camera performance with 5G connectivity.",
		price: new Decimal("299.00"),
		imageUrl: IMG[2],
		stockQuantity: 140,
		minimumOrderQuantity: 2,
	},
	{
		sku: "IPH-14-SIL-256",
		name: "iPhone 14 256GB Silver Unlocked Grade A Used",
		description:
			"iPhone 14 in elegant silver with 256GB storage. Grade A used condition with A15 Bionic chip and improved camera system. Unlocked for worldwide use.",
		price: new Decimal("649.00"),
		imageUrl: IMG[3],
		stockQuantity: 75,
		minimumOrderQuantity: 1,
	},
	{
		sku: "SAM-A54-VIO-128",
		name: "Samsung Galaxy A54 5G 128GB Violet Mid-Range",
		description:
			"Samsung Galaxy A54 5G in vibrant violet color with 128GB storage. Mid-range device with premium features including 50MP triple camera and 5000mAh battery.",
		price: new Decimal("279.00"),
		imageUrl: IMG[4],
		stockQuantity: 160,
		minimumOrderQuantity: 2,
	},
	{
		sku: "IPH-15-PNK-128",
		name: "iPhone 15 128GB Pink Factory New Unlocked",
		description:
			"Brand new iPhone 15 in gorgeous pink color with 128GB storage. Features the new A16 Bionic chip, improved camera system, and USB-C connectivity. Factory unlocked.",
		price: new Decimal("799.00"),
		imageUrl: IMG[5],
		stockQuantity: 60,
		minimumOrderQuantity: 1,
	},
	{
		sku: "GPX-6-GRY-64",
		name: "Google Pixel 6 64GB Gray Used Wholesale Android",
		description:
			"Google Pixel 6 with Google Tensor chip in sophisticated gray color. 64GB storage with excellent camera capabilities and pure Android experience. Wholesale pricing.",
		price: new Decimal("219.00"),
		imageUrl: IMG[6],
		stockQuantity: 190,
		minimumOrderQuantity: 3,
	},
	{
		sku: "SAM-S22U-BUR-256",
		name: "Samsung Galaxy S22 Ultra 256GB Burgundy S Pen",
		description:
			"Samsung Galaxy S22 Ultra in exclusive burgundy color with built-in S Pen. 256GB storage with 108MP camera and premium display. Perfect for productivity.",
		price: new Decimal("749.00"),
		imageUrl: IMG[7],
		stockQuantity: 85,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-SE3-RED-64",
		name: "iPhone SE 3rd Gen 64GB Red Compact Powerhouse",
		description:
			"iPhone SE 3rd generation in vibrant red with 64GB storage. Compact design with A15 Bionic chip power. Perfect for users who prefer smaller phones.",
		price: new Decimal("179.00"),
		imageUrl: IMG[8],
		stockQuantity: 220,
		minimumOrderQuantity: 4,
	},
	{
		sku: "GPX-8-BLU-256",
		name: "Google Pixel 8 256GB Blue AI Photography 5G",
		description:
			"Google Pixel 8 with advanced AI photography features in stunning blue. 256GB storage with Google Tensor G3 chip and enhanced computational photography.",
		price: new Decimal("519.00"),
		imageUrl: IMG[9],
		stockQuantity: 95,
		minimumOrderQuantity: 1,
	},
	{
		sku: "SAM-A34-GRN-128",
		name: "Samsung Galaxy A34 5G 128GB Green Budget Friendly",
		description:
			"Samsung Galaxy A34 5G in refreshing green color with 128GB storage. Budget-friendly device with great camera and long-lasting battery. 5G connectivity included.",
		price: new Decimal("229.00"),
		imageUrl: IMG[1],
		stockQuantity: 170,
		minimumOrderQuantity: 2,
	},
	{
		sku: "IPH-12PM-GLD-512",
		name: "iPhone 12 Pro Max 512GB Gold Premium Used",
		description:
			"iPhone 12 Pro Max in luxurious gold with massive 512GB storage. Premium used condition with ProRAW camera capabilities and LiDAR scanner. Professional grade device.",
		price: new Decimal("689.00"),
		imageUrl: IMG[2],
		stockQuantity: 70,
		minimumOrderQuantity: 1,
	},
	{
		sku: "GPX-7P-WHT-512",
		name: "Google Pixel 7 Pro 512GB White Flagship Android",
		description:
			"Google Pixel 7 Pro flagship with 512GB storage in clean white finish. Features Google Tensor G2, telephoto lens, and pure Android experience with unlimited photo storage.",
		price: new Decimal("589.00"),
		imageUrl: IMG[3],
		stockQuantity: 100,
		minimumOrderQuantity: 1,
	},
	{
		sku: "SAM-S21-PHA-256",
		name: "Samsung Galaxy S21 256GB Phantom Silver Refurb",
		description:
			"Samsung Galaxy S21 in sophisticated phantom silver with 256GB storage. Professionally refurbished with Snapdragon 888 processor and advanced camera system.",
		price: new Decimal("439.00"),
		imageUrl: IMG[4],
		stockQuantity: 125,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-13M-GRN-256",
		name: "iPhone 13 Mini 256GB Green Compact Premium",
		description:
			"iPhone 13 Mini in stunning green with 256GB storage. Compact design with full flagship features including A15 Bionic chip and advanced dual camera system.",
		price: new Decimal("459.00"),
		imageUrl: IMG[5],
		stockQuantity: 130,
		minimumOrderQuantity: 1,
	},
	{
		sku: "GPX-6P-BLK-512",
		name: "Google Pixel 6 Pro 512GB Black Professional Grade",
		description:
			"Google Pixel 6 Pro with professional-grade features in sleek black. 512GB storage with telephoto lens, Google Tensor chip, and exceptional computational photography.",
		price: new Decimal("449.00"),
		imageUrl: IMG[6],
		stockQuantity: 105,
		minimumOrderQuantity: 1,
	},
	{
		sku: "SAM-N20U-BLK-256",
		name: "Samsung Galaxy Note 20 Ultra 256GB Black S Pen",
		description:
			"Samsung Galaxy Note 20 Ultra with integrated S Pen in classic black. 256GB storage with premium display and professional-grade camera system. Perfect for productivity.",
		price: new Decimal("499.00"),
		imageUrl: IMG[7],
		stockQuantity: 80,
		minimumOrderQuantity: 1,
	},
	{
		sku: "IPH-XS-SIL-64",
		name: "iPhone XS 64GB Silver Classic Used Wholesale",
		description:
			"iPhone XS in timeless silver with 64GB storage. Classic design with A12 Bionic chip and dual camera system. Excellent wholesale option for budget-conscious buyers.",
		price: new Decimal("169.00"),
		imageUrl: IMG[8],
		stockQuantity: 280,
		minimumOrderQuantity: 5,
	},
	{
		sku: "GPX-9P-POR-128",
		name: "Google Pixel 9 Pro 128GB Porcelain Premium AI",
		description:
			"Google Pixel 9 Pro in elegant porcelain finish with 128GB storage. Features advanced AI capabilities, Tensor G4 chip, and professional-grade camera system with Magic Eraser.",
		price: new Decimal("899.00"),
		imageUrl: IMG[9],
		stockQuantity: 55,
		minimumOrderQuantity: 1,
	},
	{
		sku: "SAM-Z5-CRM-512",
		name: "Samsung Galaxy Z Fold 5 512GB Cream Foldable Premium",
		description:
			"Samsung Galaxy Z Fold 5 in luxurious cream color with 512GB storage. Revolutionary foldable design with premium build quality and multitasking capabilities. Latest foldable technology.",
		price: new Decimal("1599.00"),
		imageUrl: IMG[0],
		stockQuantity: 25,
		minimumOrderQuantity: 1,
	},
];

async function main() {
	console.log("🌱 Starting seeding process...");

	try {
		console.log("🗑️  Clearing existing products...");
		await prisma.product.deleteMany({});
		console.log("📱 Inserting products...");
		for (const product of productsData) {
			const createdProduct = await prisma.product.create({
				data: {
					...product,
					slug: `${slugify(product.name)}-${nanoid()}`,
				},
			});
			console.log(`✅ Created product: ${createdProduct.name}`);
		}
		console.log(`🎉 Successfully seeded ${productsData.length} products!`);
		const totalProducts = await prisma.product.count();
		console.log(`📊 Total products in database: ${totalProducts}`);

		const productsByBrand = await prisma.product.groupBy({
			by: ["sku"],
			_count: true,
		});

		const brandCounts = {
			iPhone: 0,
			Samsung: 0,
			"Google Pixel": 0,
		};

		for (const item of productsByBrand) {
			if (item.sku.startsWith("IPH")) brandCounts.iPhone++;
			else if (item.sku.startsWith("SAM")) brandCounts.Samsung++;
			else if (item.sku.startsWith("GPX")) brandCounts["Google Pixel"]++;
		}
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
