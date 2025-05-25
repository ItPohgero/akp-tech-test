import List from "@/web/components/ui/list";
import { ChevronUp, Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
	const footerSections = [
		{
			title: "Customer Service",
			links: [
				"Help Center",
				"Contact Us",
				"Order Status",
				"Return & Refund",
				"FAQ",
			],
		},
		{
			title: "About AKPStore",
			links: [
				"About Us",
				"Our Story",
				"Careers",
				"News & Updates",
				"Store Locations",
			],
		},
		{
			title: "Quick Links",
			links: [
				"New Arrivals",
				"Best Sellers",
				"Sale Items",
				"Gift Cards",
				"Size Guide",
			],
		},
	];

	const paymentMethods = [
		"/alfamart.svg",
		"/bcava.svg",
		"/bniva.svg",
		"/briva.svg",
		"/cimbva.svg",
		"/gopay.svg",
		"/indomaret.svg",
		"/kantorpos.svg",
		"/mandiriva.svg",
		"/mastercard.svg",
		"/maybankva.svg",
		"/ovo.svg",
		"/paypal.svg",
		"/pegadaian.svg",
		"/permatabank.svg",
		"/qris.svg",
		"/on-shopee.svg",
		"/on-tokopedia.svg",
		"/visa.svg",
	];

	return (
		<footer className="bg-gray-900 text-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold text-orange-500">AKPStore</h2>
						<p className="text-gray-300 text-sm leading-relaxed">
							Your trusted online store for quality products at affordable
							prices. We're committed to providing excellent service and
							customer satisfaction.
						</p>
						<div className="space-y-2">
							<div className="flex items-center space-x-2 text-sm text-gray-300">
								<Mail size={16} />
								<span>support@akpstore.com</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-gray-300">
								<Phone size={16} />
								<span>+62 812-3456-7890</span>
							</div>
							<div className="flex items-start space-x-2 text-sm text-gray-300">
								<MapPin size={16} className="mt-0.5" />
								<span>Jakarta, Indonesia</span>
							</div>
						</div>
					</div>
					<List
						data={footerSections}
						render={(section) => (
							<div className="space-y-4">
								<h3 className="font-semibold text-white text-sm">
									{section.title}
								</h3>
								<ul className="space-y-2">
									<List
										data={section.links}
										render={(link) => (
											<li>
												<NavLink
													to="/"
													className="text-gray-300 hover:text-orange-500 text-sm transition-colors"
												>
													{link}
												</NavLink>
											</li>
										)}
									/>
								</ul>
							</div>
						)}
					/>
				</div>

				<div className="border-t border-gray-700 pt-8">
					<div className="flex flex-col items-center lg:items-start">
						<span className="text-sm text-gray-300 mb-3">We Accept</span>
						<div className="flex flex-wrap gap-2">
							<List
								data={paymentMethods}
								render={(method) => (
									<div className="min-w-16 px-4 py-1 h-8 bg-white rounded border border-gray-200 flex items-center justify-center">
										<img
											src={method}
											alt={method}
											width={48}
											height={24}
											className="object-contain"
										/>
									</div>
								)}
							/>
						</div>
					</div>
					<div className="mt-8 pt-6 border-t border-gray-700 text-center">
						<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
							<p className="text-sm text-gray-400">
								&copy; 2025 AKPStore. All rights reserved.
							</p>
							<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
								<a href="/" className="hover:text-orange-500 transition-colors">
									Privacy Policy
								</a>
								<span className="text-gray-600">•</span>
								<a href="/" className="hover:text-orange-500 transition-colors">
									Terms of Service
								</a>
								<span className="text-gray-600">•</span>
								<a href="/" className="hover:text-orange-500 transition-colors">
									Shipping Policy
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="fixed bottom-8 right-8">
				<button
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="bg-orange-500 hover:bg-orange-600 p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
				>
					<ChevronUp size={24} className="text-white" />
				</button>
			</div>
		</footer>
	);
};

export default Footer;
