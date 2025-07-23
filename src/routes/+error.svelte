 <script>
    import { page } from '$app/state'
	import { submitButton } from '$lib/global.svelte';
 </script>
 <div class="h-screen w-screen flex flex-col justify-center items-center"> 
   

    <h1 class="text-red-600 font-head text-[80px] text-center">{page.status}</h1>
    <h1 class="text-red-600 font-head text-[60px] text-center">Error: {page.error?.message}</h1>

    <a href="/" class="{submitButton} w-32 justify-self-center" >Home</a>



</div>
