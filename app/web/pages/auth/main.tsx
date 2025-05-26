import { authClient } from "@/lib/better-auth.client";
import Logo from "@/web/components/common/logo";
import { Button } from "@/web/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/web/components/ui/card";
import { Input } from "@/web/components/ui/input";
import { Label } from "@/web/components/ui/label";
import { cn } from "@/web/lib/utils";
import { NAVIGATE } from "@/web/web-routes";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useLoadingBar } from "react-top-loading-bar";

export function meta() {
	return [
		{ title: "akpstore" },
		{ name: "description", content: "Auth to akpstore!" },
	];
}

export default function AuthPage() {
	const navigate = useNavigate();
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
	});
	const { start, complete } = useLoadingBar({
		color: "orange",
		height: 2,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSignUp = async ({
		email,
		password,
		name,
		image,
	}: { email: string; password: string; name: string; image?: string }) => {
		start();
		await authClient.signUp.email(
			{
				email,
				password,
				name,
				image,
			},
			{
				onRequest: (ctx) => {
					console.log("onRequest", ctx);
				},
				onSuccess: (ctx) => {
					console.log("onSuccess", ctx);
					complete();
					navigate(NAVIGATE.DASHBOARD);
				},
				onError: (ctx) => {
					alert(ctx.error.message);
				},
			},
		);
	};

	const handleSignIn = async (email: string, password: string) => {
		start();
		await authClient.signIn.email(
			{
				email,
				password,
				callbackURL: "/dashboard",
			},
			{
				onRequest: (ctx) => {
					console.log("onRequest", ctx);
				},
				onSuccess: (ctx) => {
					console.log("onSuccess", ctx);
					complete();
					navigate(NAVIGATE.DASHBOARD);
				},
				onError: (ctx) => {
					alert(ctx.error.message);
				},
			},
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isSignUp) {
			await handleSignUp({
				email: formData.email,
				password: formData.password,
				name: formData.name,
			});
		} else {
			await handleSignIn(formData.email, formData.password);
		}
	};

	// with better auth make function forgot password

	const handleForgotPassword = async (email: string) => {
		await authClient.forgetPassword(
			{
				email,
				redirectTo: "/auth/reset-password",
			},
			{
				onRequest: (ctx) => {
					console.log("onRequest", ctx);
				},
				onSuccess: (ctx) => {
					alert("Check your email for the reset link.");
					console.log("onSuccess", ctx);
				},
				onError: (ctx) => {
					alert(ctx.error.message);
				},
			},
		);
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen ">
			<div className="flex flex-col gap-6">
				<Card>
					<CardHeader className="text-center">
						<CardTitle>
							<Logo />
						</CardTitle>
						<CardDescription className="text-lg text-muted-foreground">
							{isSignUp ? "Create an account" : "Welcome back"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<div className="grid gap-6">
								<div className="grid gap-6">
									{isSignUp && (
										<div className="grid gap-3">
											<Label htmlFor="name">Full Name</Label>
											<Input
												id="name"
												name="name"
												type="text"
												placeholder="John Doe"
												value={formData.name}
												onChange={handleInputChange}
												required
											/>
										</div>
									)}
									<div className="grid gap-3">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="m@example.com"
											value={formData.email}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div className="grid gap-3">
										<div className="flex items-center">
											<Label htmlFor="password">Password</Label>
											{!isSignUp && (
												<button
													type="button"
													onClick={() => handleForgotPassword(formData.email)}
													disabled={!formData.email}
													className={cn(
														"ml-auto text-sm underline-offset-4 hover:underline",
														!formData.email && "cursor-not-allowed opacity-50",
													)}
												>
													Forgot your password?
												</button>
											)}
										</div>
										<Input
											id="password"
											name="password"
											type="password"
											value={formData.password}
											placeholder="********"
											onChange={handleInputChange}
											required
										/>
									</div>
									<Button type="submit" className="w-full">
										{isSignUp ? "Sign up" : "Login"}
									</Button>
								</div>
								<div className="text-center text-sm">
									{isSignUp ? (
										<>
											Already have an account?{" "}
											<button
												type="button"
												onClick={() => setIsSignUp(false)}
												className="underline underline-offset-4 hover:text-primary"
											>
												Sign in
											</button>
										</>
									) : (
										<>
											Don&apos;t have an account?{" "}
											<button
												type="button"
												onClick={() => setIsSignUp(true)}
												className="underline underline-offset-4 hover:text-primary"
											>
												Sign up
											</button>
										</>
									)}
								</div>
							</div>
						</form>
					</CardContent>
				</Card>
				<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
					By clicking continue, you agree to our{" "}
					<NavLink to="/">Terms of Service</NavLink> and{" "}
					<NavLink to="/">Privacy Policy</NavLink>.
				</div>
			</div>
		</div>
	);
}
