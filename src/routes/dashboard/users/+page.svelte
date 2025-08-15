<script lang='ts'>
	import { submitButton } from '$lib/global.svelte.js';
  import Table from '$lib/Table.svelte';
	import { BrushCleaning, Mars, RotateCcw, SlidersHorizontal, Venus } from '@lucide/svelte';
	import { fly } from 'svelte/transition';


   let { data } = $props();

   let users = $state(data.users);


  

   let tableHeaders = $state([
    
   
   {name:'Id', key: 'id'},
   {name:'Name', key: 'name'},
   {name:'Email', key: 'email'},
   {name:'Role', key: 'roleName'},
   {name:'Email Verified', key: 'emailVerified'},
   {name: 'Active', key: 'isActive'}
  
  ]);



  

  let componentKey = $state(0);

  function reloadComponent() {
        componentKey++;
        users = data.users;
 } 


let fileName = 'Ethio Iq System Users'










  





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

