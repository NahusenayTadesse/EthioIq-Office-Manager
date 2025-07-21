
<script lang='ts'>
    import { select, submitButton } from "$lib/global.svelte";
	import { ArrowDownWideNarrow, ArrowLeft, ArrowUpWideNarrow, BrushCleaning, LoaderCircle, Mars, OctagonMinus, RotateCcw, SlidersHorizontal, Venus } from "@lucide/svelte";
    import JSPDF from '$lib/JSPDF.svelte';
    import { fly } from 'svelte/transition';

    let table = $state();


   let { data } = $props();
   let employeeList = $state(data.employeeList);
   let tableHeaders = $state([
    
   
   {name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'lastName', key: 'lastName'},
   {name:'Gender', key: 'gender'},
   {name:'Position', key: 'position'},
   {name: 'Active', key: 'isActive'}

  
  
  ]);
   let searchQuery= $state('');
   let hover = $state(false);
   let positionsList = $derived([...new Set(employeeList.map(employee => employee.position))]);
   let genders = $derived([...new Set(employeeList.map(employee => employee.gender))]);
   let filter = $state(false);
   let activeList = $derived([...new Set(employeeList.map(employee => employee.isActive))]);

   let rows = $state(['id', 'firstName', 'position', 'isActive'])


   function moveElement(fromIndex: number, toIndex: number) {
    const element = tableHeaders.splice(fromIndex, 1)[0]; // Remove the element
    tableHeaders.splice(toIndex, 0, element); // Insert it at the new index
    return tableHeaders;
} 

  
  let positions = $state([]);

  let active = $state('');
 let componentKey = $state(0);

      function reloadComponent() {
        componentKey++;

        employeeList = data.employeeList;
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
function sorter(head:string){
   if(head === '')
   return employeeList;
  if (head === 'id')
   return employeeList.sort((a, b) => Number(a.id) - Number(b.id));
  if(head === 'isActive')
   return  employeeList.sort((a, b) => (b.isActive - a.isActive));

return employeeList.sort((a,b)=> a[head].localeCompare(b[head]) )
}
//Reverse Sorter

function sorterReverse(head: string){
   if(head === '')
   return employeeList;
  if (head === 'id')
   return employeeList.sort((a, b) => Number(b.id) - Number(a.id));
  if(head === 'isActive')
   return  employeeList.sort((a, b) => (a.isActive - b.isActive));

return employeeList.sort((a,b)=> b[head].localeCompare(a[head]) )
}








 function filterer(){
  let activeStatus;
      if(active === 'true'){
         activeStatus = true;
      } 
      if(active === 'false'){
         activeStatus = false;
      }

      filterByProperties({gender: genders, position: positions, isActive: activeStatus});
         
 }
function moveColumnLeftWithWrap(colIndex:number) {
  const table = document.getElementById("employees");
  const columnCount = table.rows[0].cells.length;

  // Calculate new index (wrap around if colIndex is 0)
  const newIndex = (colIndex - 1 + columnCount) % columnCount;

  // Only swap if source and destination indices are different
  if (colIndex === newIndex) return;

  swapColumns(colIndex, newIndex);
}

function swapColumns(index1, index2) {
  const table = document.getElementById("employees");

  for (const row of table.rows) {
    // Swap the two cells (either th or td)
    const cells = row.cells;
    if (cells.length > Math.max(index1, index2)) {
      row.insertBefore(cells[index2], cells[index1]);
    }
  }
}
function rotateColumnsLeft(index: number) {
  const table = document.getElementById("employees");
  const columnCount = table.rows[0].cells.length;

  for (const row of table.rows) {
    const cells = row.cells;
    if (cells.length > 1) {
      const firstCell = cells[index-1];
      row.insertBefore(firstCell); // Moves first cell to the end
    }
  }
}

// Define searchable fields
const searchableFields = ['id', 'firstName', 'lastName', 'gender', 'position'];

// Filter function
function filterEmployees(employees, query) {
  if (!query) return employees;
  const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(term => term.length > 0);
  if (queryTerms.length === 0) return employees;

  return employees.filter(employee => {
    // Create a virtual fullName field
    const fullName = `${employee.firstName ?? ''} ${employee.lastName ?? ''}`.toLowerCase();
    return queryTerms.every(term =>
      searchableFields.some(field =>
        String(employee[field] ?? '').toLowerCase().includes(term)
      ) || fullName.includes(term)
    );
  });
}
</script>
<svelte:head>
   <title> Employees </title>
</svelte:head>


<button onclick={()=>swapColumns(4, 0)}>Swap Name and Gender</button>

  <button class="{submitButton} w-[150px]" onclick={()=>moveElement(2,0)}>Move</button>


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
           <button onclick={() => sorter(head.key) } 
             class="flex flex-row items-center justify-between"  title = "Sort with {head.name}" >{head.name} 
        
             <ArrowDownWideNarrow class="w-[16px] {hover ? 'opacity-100': 'opacity-0'} transition-all"/>
            </button>

            <button onclick={() => sorterReverse(head.key) } 
             class="flex flex-row items-center justify-between"  title = 'Reverse Sort with {head.name}' > 
        
             <ArrowUpWideNarrow  class="w-[16px] {hover ? 'opacity-100': 'opacity-0'} transition-all"/>
            </button>
            </div>

            {#if hover}

            <div class="flex flex-row">

             <button onclick={() => removeColumn(index)} 
              class="rounded-[50%] absolute right-0 top-2" title='Cut {head} from table'>
              <OctagonMinus size=16 color='red' /></button>


              <button onclick={()=> rotateColumnsLeft(index)} class="rounded-[50%] absolute right-0 top-6" title="Move Column to the Left"><ArrowLeft size=16 /></button>
              </div>
              {/if}
              
              

          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-200"  >
        {#if filterEmployees(employeeList, searchQuery).length === 0}
  <tr>
    <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
      No employees found matching "{searchQuery}".
    </td>
  </tr>
      
       {:else}
      {#each Object.values(filterEmployees(employeeList, searchQuery)) as employee} 
    
 
        <tr class="hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-150"> 
          
      
        {#each Object.entries(employee) as [key, value]}
          {#if key === 'isActive'}
          <td class="px-6 py-4 whitespace-nowrap text-sm  {value ? 'bg-green-400' : 'bg-red-400'} text-white">{value ? 'Active' : 'InActive'}</td>
          {:else }
          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">{value}</td>
                
         {/if}
          
          
          {/each}
        </tr>
      {/each}
      {/if}
    </tbody>
  </table>
  {/await}
   {/key}
</div>


{#each Object.values(filterEmployees(employeeList, searchQuery)) as employee}
  <div class="employee">
    <ul>
      {#each Object.entries(employee) as [key, value]}
        <li><strong>{key}:</strong> {value}</li>
      {/each}
    </ul>
  </div>
{/each}








