import { authClient } from "@/lib/better-auth.client";
import { Button } from "@/web/components/ui/button";
import { useNavigate } from "react-router";

export default function WelcomePage() {
	const navigate = useNavigate();
	const handleSignOut = async () => {
		
		// Sign out logic here
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate("/");
				},
			},
		});
	}
	return (
		<div className="container mx-auto p-4">
			<p>Dashboard</p>
			<Button variant="outline" onClick={handleSignOut}>
				handleSignOut
			</Button>
		</div>
	);
}
