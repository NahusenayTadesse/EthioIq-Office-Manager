<script lang="ts">
import { signIn } from "$lib/auth-client";
import { writable } from "svelte/store";
import { formContainer, formContainerInner, input, label, submitButton } from "$lib/global.svelte";

const email = writable("");
const password = writable("");

const handleSignIn = async () => {
	await signIn.email(
		{
			email: $email,
			password: $password,
			callbackURL: "/dashboard",
		},
		{
			onError(context) {
				alert(context.error.message);
			},
		},
	);
};
</script>

<div class={formContainer}>
    <div class={formContainerInner}>
        <div class="mb-8 text-center">
            <div class="flex flex-col justify-center items-center">
           <img src="/ethioiq.png" class="w-1/2" alt="Ethio Iq Logo">
           </div>
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Sign in to your account</h2>
            <p class="text-gray-500 dark:text-gray-400">
                Enter your email below to login to your account
            </p>
        </div>
        <form onsubmit={handleSignIn} class="space-y-6">
            <div>
                <label for="email" class={label}>Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    class={input}
                    bind:value={$email}
                />
            </div>
            <div>
                <div class="flex items-center justify-between mb-1">
                    <label for="password" class={label}>Password</label>
                    <a
                        href="/forget-password"
                        class="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Forgot password?
                    </a>
                </div>
                <input
                    id="password"
                    type="password"
                    required
                    class={input}
                    bind:value={$password}
                />
            </div>
            <button
                type="submit"
                class={submitButton}
            >
                Login
            </button>
            <div class="relative flex items-center justify-center">
                <span class="absolute left-0 w-full border-t border-gray-200 dark:border-gray-700"></span>
                <span class="bg-white dark:bg-gray-950 px-2 text-gray-400 dark:text-gray-500 text-xs z-10">or</span>
            </div>
            <button
                type="button"
                class="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 font-semibold bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                onclick={async () => {
                    await signIn.social({
                        provider: "google",
                        callbackURL: "/dashboard",
                    });
                }}
            >
                <svg class="h-5 w-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.6 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 6.1 28.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 6.1 28.1 4 24 4c-7.2 0-13.3 4.1-16.7 10.7z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.6-1.9 14.1-5.1l-6.5-5.3C29.8 36 24 36 24 36c-5.8 0-10.6-1.9-14.1-5.1l6.5-5.3C18.2 33.1 24 36 24 36z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.6 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 6.1 28.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/></g></svg>
                Login with Google
            </button>
        </form>
        <div class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?
            <a href="/signup" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Sign up</a>
        </div>
    </div>
</div>