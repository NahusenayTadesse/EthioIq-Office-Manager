
<script lang='ts'>
    import { select, submitButton } from "$lib/global.svelte";
	import { ArrowDownWideNarrow, SlidersHorizontal } from "@lucide/svelte";
	import { fly } from "svelte/transition";

   let { data } = $props();
   let employeeList = $state(data.employeeList);
   let tableHeaders = ['', 'Name','Gender', 'Position', 'Active'];
   let searchQuery= $state('');
  
 
  
const filterByProperties2 = (filters: { [key: string]: any }) => {
  employeeList = data.employeeList.filter(emp =>
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


  let filter = $state(false);

  let name = $state('');
  let lastName = $state('')
  let gender = $state(['male', 'female'])

  let position = $state(['']);
  let active = $state(true);
 

  function activer(){

     if(notActive === 'true'){
        active = true;
        return true;
     }

     else if(notActive === 'false'){
      active = false;
      return false;
     }
     else return null;
    
  }





//Sorter
function sorter(head: string){
   if(head === '')
   return employeeList;
  if(head === 'Name')
   return employeeList.sort((a, b) => a.firstName.localeCompare(b.firstName));
  if(head === 'Gender')
      return employeeList.sort((a, b) => a?.gender.localeCompare(b?.gender));
  if(head==='Position')
       return employeeList.sort((a, b) => a.position.localeCompare(b.position));
  if(head === 'Active')
    return employeeList.reverse();


}


let hover = $state(false);
let notActive = $state('');

function filterer(){
  if(notActive === 'true') active=true;
  if(notActive === 'false') active = false;
  filterByProperties2({ gender: gender, position: position, firstName: name, lastName: lastName, isActive: active});


}
    import JSPDF from '$lib/JSPDF.svelte';
    
</script>
<svelte:head>
   <title> Employees </title>
</svelte:head>






    <JSPDF fileName = 'Employees' tableId="#employees" />
Number of Employees: {employeeList.length} <br>



<div class="m-4">
  <button onclick={()=> filter = !filter} aria-label="Advanced Filter"><SlidersHorizontal  /> </button> 

  {#if filter}
  <div transition:fly={ {x:-200, duration: 600}}>
  <br />

<form onsubmit={filterer}>

<div class="space-y-4 p-4 flex flex-row flex-wrap gap-4">
  <!-- Gender Select -->
  <div>
    <label for="gender" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
      Gender
    </label>
    <select
      id="gender"
      bind:value={gender}

    >
      <option disabled value="">Select Gender</option>
      <option value="">All</option>
      <option value="male">Male</option>
      <option value="female" >Female</option>
    </select>




  </div>

  <!-- Position Select -->
  <div>
    <label for="position" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
      Position
    </label>
    <select
      id="position"
      bind:value={position} 
      class={select}
    >
      <option disabled value="">Select Employee Position</option>
      <option value="">All</option>
      {#each data?.positionList as option}
        <option value={option.position}>{option.position}</option>
      {/each}
    </select>
  </div>
   
   <div>
     <!-- Active Select-->

     <select
      id="gender"
      bind:value={notActive}

    >
      <option disabled value="">Select Active Status</option>
      <option value="">All</option>
      <option value="true">Active</option>
      <option value="false" >Not Active</option>
    </select>


   </div>
</div>
<button type="submit" class="{submitButton} !w-[80px]">Filter</button>
</form>




  
  <button onclick={()=> employeeList = data.employeeList} class="{submitButton} !w-[80px]">Clear</button>


  
  </div>

  
  {/if}


</div>






    



  <input type="text" class="{select} !w-[200px] !placeholder:dark:text-white m-2 ml-0" bind:value={searchQuery} placeholder="Search Employees">
  

 <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-200/20">
  <table id="employees" class="min-w-full divide-y divide-gray-200 dark:divide-gray-200">
    <thead class="bg-gray-100 dark:bg-black">
      <tr>
        {#each tableHeaders as head }
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
          >
           <button onclick={() => sorter(head) } onmouseenter={()=> hover=true} onmouseleave={()=>hover=false} class="flex flex-row items-center justify-between" >{head} {#if head === ''} <span></span> {:else}<ArrowDownWideNarrow class="w-[16px] {hover ? 'opacity-100': 'opacity-0'} transition-all"/>{/if}</button>
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
        String(employee?.position ?? '').toLowerCase().includes(searchQuery.toLowerCase())) : employeeList as employee, index}
        <tr class="hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-150">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{index+1}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"><a href="/dashboard/employees/{employee.id}"> {employee.firstName} {employee.lastName} </a></td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize dark:text-gray-200">{employee.gender}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{employee.position}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm  {employee.isActive ? 'bg-green-400' : 'bg-red-400'} text-white">{employee.isActive ? 'Active' : 'InActive'}</td>
          
        </tr>
      {/each}
    </tbody>
  </table>
</div>










