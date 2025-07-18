<script lang="ts">
import { signUp } from "$lib/auth-client";
import { writable } from "svelte/store";

// Create writable stores for form fields
const firstName = writable("");
const lastName = writable("");
const email = writable("");
const password = writable("");

// Function to handle form submission
const handleSignUp = async () => {
	const users = {
		firstName: $firstName,
		lastName: $lastName,
		email: $email,
		password: $password,
	};
	await signUp.email({
		email: users.email,
		password: users.password,
		name: `${users.firstName} ${users.lastName}`,
		callbackURL: "/",
		fetchOptions: {
			onError(context) {
				alert(context.error.message);
			},
		},
	});
};

</script>

<div class="mx-auto max-w-sm border rounded-lg shadow bg-white">
    <div class="p-6 border-b">
        <h2 class="text-xl font-semibold">Sign Up</h2>
        <p class="text-gray-600">
            Enter your information to create an account
        </p>
    </div>
    <div class="p-6">
        <div class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                    <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                    <input
                        id="first-name"
                        class="block w-full border rounded px-3 py-2"
                        placeholder="Max"
                        required
                        bind:value={$firstName}
                    />
                </div>
                <div class="grid gap-2">
                    <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                    <input
                        id="last-name"
                        class="block w-full border rounded px-3 py-2"
                        placeholder="Robinson"
                        required
                        bind:value={$lastName}
                    />
                </div>
            </div>
            <div class="grid gap-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    class="block w-full border rounded px-3 py-2"
                    placeholder="m@example.com"
                    required
                    bind:value={$email}
                />
            </div>
            <div class="grid gap-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    class="block w-full border rounded px-3 py-2"
                    bind:value={$password}
                />
            </div>
            <button
                type="button"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                on:click={handleSignUp}
            >
                Create an account
            </button>
            
        </div>
        <div class="mt-4 text-center text-sm">
            Already have an account?
            <a href="/sign-in" class="underline text-blue-600"> Sign in </a>
        </div>
    </div>
</div>
