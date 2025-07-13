<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { formContainer, formContainerInner, input, label, submitButton } from "$lib/global.svelte";
import { writable } from "svelte/store";

const confirmPassword = writable("");
const password = writable("");
</script>

<div class={formContainer}>
    <div class={formContainerInner}>
        <div class="mb-8 text-center">
            <svg class="mx-auto mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="2" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12l2 2 4-4" />
            </svg>
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Reset Password</h2>
            <p class="text-gray-500 dark:text-gray-400">
Enter your new password below
            </p>
        </div>
        <form  class="space-y-6">
            
            

             <div>
                <div class="flex items-center justify-between mb-1">
                    <label for="password" class={label}>New Password</label>
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
                    bind:value={$confirmPassword}
                />
            </div>
            
            <button
                type="submit"
                class={submitButton}
                onclick={async () => {
          await authClient.resetPassword({
            newPassword: $password,
            fetchOptions: {
              onSuccess(context) {
                window.location.href = "/sign-in";
              },
              onError(context) {
                alert(context.error.message);
              },
            },
          });
        }}
            >
                Login
            </button>
            
            
        </form>
      <div class="mt-4 text-center text-sm">
      <a href="/login" class="underline"> Back to Sign In </a>
    </div>
    </div>
</div>
