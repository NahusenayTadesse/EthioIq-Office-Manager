<script lang='ts'>
    const searchableFields = ['id', 'firstName', 'lastName', 'gender', 'position'];
    type Dataset = {
  [key: string]: any; // Ideally, define specific properties if known
};
	import { BrushCleaning, Mars, SlidersHorizontal, Venus } from "@lucide/svelte";
  import { submitButton } from "./global.svelte";
  import { fly } from 'svelte/transition';
  let filter = $state(false);
   let {list } = $props();



   let positionsList = $derived([...new Set(list.map((person: { position: string; }) => person.position))]);
   let genders = $derived([...new Set(list.map((person: { gender: string; }) => person.gender))]);
   let activeList = $derived([...new Set(list.map((person: { isActive: boolean; }) => person.isActive))]);


// Filter function



const filterByProperties = (list: any, filters: { [key: string]: any }) => {
  list = list.filter(emp =>
    Object.entries(filters).every(([key, filterValue]) => {
      // If filter value is empty, always include
      if (filterValue === '' || filterValue === null || filterValue === undefined) {
        return true;
      }
      
      // Get the employee's value for this property
      const empValue = emp[key];
      
      // If filter value is an array, check if employee value is included
      if (Array.isArray(filterValue)) {
        return filterValue.includes(empValue);
      }
      
      // Otherwise, do direct comparison
      return empValue === filterValue;
    })
  );
};

</script>

<div class="m-4">
  <button onclick={()=> filter = !filter} aria-label="Advanced Filter" title="Filter Table"><SlidersHorizontal  /> </button> 

  </div>
    {#if filter}

<div class="flex flex-col gap-4 pb-4" transition:fly={{x:-200, duration: 600}}>
   <button onclick={()=> list = list} class="{submitButton} !w-[120px] flex flex-row gap-2 justify-center items-center" title="Clear Filter">
    <BrushCleaning size=18 /> Clear</button>

  <h1>Gender</h1>

  <div class="flex flex-row gap-4">

      
  {#each genders as gender}



 <button onclick={()=> filterByProperties(list, {gender: gender})} class="{submitButton} p-4 w-32 capitalize flex flex-row gap-2"> {#if gender === "male"}
  <Mars />
  {:else} 
   <Venus />
  {/if}
  
  {gender}</button>
    
 {/each}
 </div>
 <h1>Active Status</h1>
 <div class="flex flex-row gap-2">
    
  {#each activeList as active}
 <button onclick={()=> filterByProperties(list, {isActive: active})} class="{submitButton} p-4 w-32 {active ? '!bg-green-400': '!bg-red-400'}"> {active ? 'Active':'Not Active'}</button>

 {/each}
 </div>

 <h1> Employee Position</h1>
 <div class="flex flex-row gap-2 flex-wrap">
 {#each positionsList as position}

 <button onclick={()=> filterByProperties(list, {position: position})} class="{submitButton} p-4"> {position}</button>
    
 {/each} 
 </div>

</div>  

{/if} 





 
