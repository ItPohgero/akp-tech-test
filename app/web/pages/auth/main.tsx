import { authClient } from "@/lib/better-auth.client";

export function meta() {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function AuthPage() {


    const handleSignUp = async ({ email, password, name, image }: { email: string, password: string, name: string, image: string }) => {
        await authClient.signUp.email({
            email, // user email address
            password, // user password -> min 8 characters by default
            name, // user display name
            image, // User image URL (optional)
            callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
        }, {
            onRequest: (ctx) => {
                console.log("onRequest", ctx);
                //show loading
            },
            onSuccess: (ctx) => {
                console.log("onSuccess", ctx);
                //redirect to the dashboard or sign in page
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
        });
    }
    return <div>
        <h1>Auth Page</h1>
        <div>
            <button type="button" onClick={() => handleSignUp({
                email: "zZTJH@example.com",
                password: "password",
                name: "Zulfi",
                image: "https://example.com/image.png",
            })}>Sign Up</button>
        </div>
        <div>
            <button type="button" onClick={() => authClient.signIn.email({
                email: "zZTJH@example.com",
                password: "password",
                callbackURL: "/dashboard",
            })}>Sign In</button>
        </div>
    </div>;
}
