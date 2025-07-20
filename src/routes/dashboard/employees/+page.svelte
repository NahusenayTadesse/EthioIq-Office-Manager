
<script lang='ts'>
    import { select, submitButton } from "$lib/global.svelte";
	import { ArrowDownWideNarrow, ArrowUpWideNarrow, BrushCleaning, LoaderCircle, Mars, OctagonMinus, RotateCcw, SlidersHorizontal, Venus } from "@lucide/svelte";
    import JSPDF from '$lib/JSPDF.svelte';
    import { fly } from 'svelte/transition';

    let table = $state();


   let { data } = $props();
   let employeeList = $state(data.employeeList);
   let tableHeaders = ['Id', 'Name','Gender', 'Position', 'Active'];
   let searchQuery= $state('');
   let hover = $state(false);
   let positionsList = $derived([...new Set(employeeList.map(employee => employee.position))]);
   let genders = $derived([...new Set(employeeList.map(employee => employee.gender))]);
   let filter = $state(false);
   let activeList = $derived([...new Set(employeeList.map(employee => employee.isActive))]);

  
  let positions = $state([]);

  let active = $state('');
 let componentKey = $state(0);

      function reloadComponent() {
        componentKey++;

        employeeList = data.employeeList;
      }



   function removeRow(index: number) {
    table.deleteRow(index);
  }

  function removeColumn(colIndex) {
    for (let row of table.rows) {
      if (row.cells.length > colIndex) {
        row.deleteCell(colIndex);
      }
    }
  }
  
const filterByProperties = (filters: { [key: string]: any }) => {
  employeeList = employeeList.filter(emp =>
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



 






//Sorter
function sorter(head: string){
   if(head === '')
   return employeeList;
  if (head === 'Id')
   return employeeList.sort((a, b) => Number(a.id) - Number(b.id));
  if(head === 'Name')
   return employeeList.sort((a, b) => a.firstName.localeCompare(b.firstName));
  if(head === 'Gender')
      return employeeList.sort((a, b) => a?.gender.localeCompare(b?.gender));
  if(head==='Position')
       return employeeList.sort((a, b) => a.position.localeCompare(b.position));
  if(head === 'Active')
    employeeList.sort((a, b) => (b.isActive - a.isActive));

}
//Reverse Sorter

function sorterReverse(head: string){
   if(head === '')
   return employeeList;
  if (head === 'Id')
   return employeeList.sort((a, b) => Number(b.id) - Number(a.id));
  if(head === 'Name')
   return employeeList.sort((a, b) => b.firstName.localeCompare(a.firstName));
  if(head === 'Gender')
      return employeeList.sort((a, b) => b?.gender.localeCompare(a?.gender));
  if(head==='Position')
       return employeeList.sort((a, b) => b.position.localeCompare(a.position));
  if(head === 'Active')
    employeeList.sort((a, b) => (a.isActive - b.isActive));

}






 function filterer(){
  let activeStatus;
      if(active === 'true'){
         activeStatus = true;
      } 
      if(active === 'false'){
         activeStatus = false;
      }

      filterByProperties({gender: gender, position: positions, isActive: activeStatus});
         
 }

    
</script>
<svelte:head>
   <title> Employees </title>
</svelte:head>






    <JSPDF fileName = 'Employees' tableId="#employees" />
Number of Employees: {employeeList.length} <br>



<div class="m-4">
  <button onclick={()=> filter = !filter} aria-label="Advanced Filter" title="Filter Table"><SlidersHorizontal  /> </button> 

  </div>
    {#if filter}

<div class="flex flex-col gap-4 pb-4" transition:fly={{x:-200, duration: 600}}>
   <button onclick={()=> employeeList = data.employeeList} class="{submitButton} !w-[120px] flex flex-row gap-2 justify-center items-center" title="Clear Filter">
    <BrushCleaning size=18 /> Clear</button>

  <h1>Gender</h1>

  <div class="flex flex-row gap-4">

      
  {#each genders as gender}



 <button onclick={()=> filterByProperties({gender: gender})} class="{submitButton} p-4 w-32 capitalize flex flex-row gap-2"> {#if gender === "male"}
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
 <button onclick={()=> filterByProperties({isActive: active})} class="{submitButton} p-4 w-32 {active ? '!bg-green-400': '!bg-red-400'}"> {active ? 'Active':'Not Active'}</button>

 {/each}
 </div>

 <h1> Employee Position</h1>
 <div class="flex flex-row gap-2 flex-wrap">
 {#each positionsList as position}

 <button onclick={()=> filterByProperties({position: position})} class="{submitButton} p-4"> {position}</button>
    
 {/each} 
 </div>

</div>

{/if}

  <input type="text" class="{select} !w-[200px] !placeholder:dark:text-white m-2 ml-0" bind:value={searchQuery} placeholder="Search Employees">
   


 <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-200/20 relative">
      {#key componentKey}

       <button onclick={reloadComponent} class="aboslute right-0 top-0" aria-label="Relaod Table" title="Reload Table" > <RotateCcw  /></button>
       {#await data}
           <h1 class="flex flex-row m-2">     Loading Employee Data <LoaderCircle class="animate-spin" /></h1>

        
      {:then employee} 

  <table id="employees" class="min-w-full divide-y divide-gray-200 dark:divide-gray-200" bind:this = {table}>
    <thead class="bg-gray-100 dark:bg-black">
      <tr>
        {#each tableHeaders as head, index }
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-semibold text-gray-700
             dark:text-gray-300 uppercase tracking-wider relative"
          onmouseenter={()=> hover=true}
             onmouseleave={()=>hover=false}
          
            >
            <div class="flex flex-row">
           <button onclick={() => sorter(head) } 
             class="flex flex-row items-center justify-between"  title = "Sort with {head}" >{head} 
        
             <ArrowDownWideNarrow class="w-[16px] {hover ? 'opacity-100': 'opacity-0'} transition-all"/>
            </button>

            <button onclick={() => sorterReverse(head) } 
             class="flex flex-row items-center justify-between"  title = "Sort with {head}" > 
        
             <ArrowUpWideNarrow title = 'Reverse Sort with {head}' class="w-[16px] {hover ? 'opacity-100': 'opacity-0'} transition-all"/>
            </button>
            </div>

            {#if hover}

             <button onclick={() => removeColumn(index)} 
              class="rounded-[50%] absolute right-0 top-2" title='Cut {head} from table'>
              <OctagonMinus size=16 color='red' /></button>
              {/if}
              

          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-200"  >
      {#each searchQuery ? data.employeeList.filter(employee =>
        String(employee?.id ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(employee?.firstName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(employee?.lastName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(employee?.gender ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(employee?.position ?? '').toLowerCase().includes(searchQuery.toLowerCase())) : employeeList as employee}
        <tr class="hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-150">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{employee.id}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"><a href="/dashboard/employees/{employee.id}"> {employee.firstName} {employee.lastName} </a></td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize dark:text-gray-200">{employee.gender}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{employee.position}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm  {employee.isActive ? 'bg-green-400' : 'bg-red-400'} text-white">{employee.isActive ? 'Active' : 'InActive'}</td>
          
        </tr>
      {/each}
    </tbody>
  </table>
  {/await}
   {/key}
</div>


   








