<script lang='ts'>
	import { submitButton } from '$lib/global.svelte.js';
  import Table from '$lib/Table.svelte';
	import { BrushCleaning, Mars, RotateCcw, SlidersHorizontal, Venus } from '@lucide/svelte';
	import { fly } from 'svelte/transition';


   let { data } = $props();

   let users = $state(data.users);



  

  let componentKey = $state(0);

  function reloadComponent() {
        componentKey++;
        users = data.users;
 } 




   










  





</script>

 <svelte:head>
   <title> Users </title>
 </svelte:head>





  

<br />
{#key componentKey}

<button onclick={reloadComponent} class="aboslute right-0 top-0" aria-label="Relaod Table" title="Reload Table" > <RotateCcw  /></button>
 <div class= "">
 <Table mainlist = {users} {tableHeaders} {fileName}  />
</div>
{/key}

