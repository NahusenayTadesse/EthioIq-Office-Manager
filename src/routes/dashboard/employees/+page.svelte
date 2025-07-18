
<script lang='ts'>
    import { select, submitButton } from "$lib/global.svelte";
	import { ArrowDownWideNarrow, Download, SlidersHorizontal } from "@lucide/svelte";
	import { fly } from "svelte/transition";

    
 
    let { data } = $props();


    let employeeList = $state(data.employeeList);
    let tableHeaders = ['', 'Name','Gender', 'Position', 'Active'];
    
    let searchQuery= $state('');
  
 
  const filterByProperties = (filters: { [key: string]: any }) => {
  employeeList = data.employeeList.filter(emp =>
    Object.entries(filters).every(([key, value]) =>
      value === '' || emp[key] === value
    )
  );
};


  let filter = $state(false);

  let name = $state('');
  let lastName = $state('')
  let gender = $state('')

  let position = $state('');
  let active = $state(true);
 

  function activer(){

     active = !active;

     filterByProperties({ isActive: active})
    
  }

  import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'


function generatedPdf() {
  const doc = new jsPDF();

  autoTable(doc, {
    html: '#employees', 
    styles: {
      font: 'helvetica',         
      fontSize: 10,              
      textColor: [40, 40, 40],   
      halign: 'left',            
      valign: 'middle',          
      cellPadding: 4,            
    },
    headStyles: {
      fillColor: [0, 0, 0],  
      textColor: 255,              
      fontStyle: 'bold',           
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],  // Light gray for alternating rows
    },
    tableLineColor: [200, 200, 200], // Table border color
    tableLineWidth: 0.1,            // Table border width
    margin: { top: 20 },            // Top margin of the table
  });

  doc.save('Employee.pdf');
}


let keeps = $state(false);




function sorter(head: string){
   if(head === '')
   return employeeList;
  if(head === 'Name')
   return employeeList.sort((a, b) => a.firstName.localeCompare(b.firstName));
  if(head === 'Gender')
      return employeeList.sort((a, b) => a.gender.localeCompare(b.gender));
  if(head==='Position')
       return employeeList.sort((a, b) => a.position.localeCompare(b.position));
  if(head === 'Active')
    return employeeList.reverse();


}

let hover = $state(false);

const seenTypes = new Set();
const filtered = $derived(employeeList.filter(item => {
  if (seenTypes.has(item.position)) {
    return false;
  }
  seenTypes.add(item.position);
  return true;
}));



  
    
</script>
<svelte:head>
   <title> Employees </title>
</svelte:head>

    <button class="{submitButton} !w-[180px] !fixed right-4 top-24 flex flex-row gap-2 justify-center items-center !p-4" onclick={generatedPdf}> <Download /> Download PDF</button>

   


Number of Employees: {employeeList.length} <br>




<div class="m-4">
  <button onclick={()=> filter = !filter} aria-label="Advanced Filter"><SlidersHorizontal  /> </button> 

  {#if filter}
  <div transition:fly={ {x:-200, duration: 600}}>
  <br />

<div class="space-y-4 p-4 flex flex-row flex-wrap gap-4">
  <!-- Gender Select -->
  <div>
    <label for="gender" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
      Gender
    </label>
    <select
      id="gender"
      bind:value={gender}

      onclick = {()=>filterByProperties({gender: gender})}
class={select}    >
      <option disabled value="">Select Gender</option>
      <option value="">All</option>
      <option value="male">Male</option>
      <option value="female" >Female</option>
    </select>

      <button class="{submitButton} !w-[150px] {!active ? '!bg-green-500': '!bg-red-500'} m-2" onclick={() => activer()}>{active ? 'Inactive Only' : 'Active Only'}</button>

  </div>

  <!-- Position Select -->
  <div>
    <label for="position" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
      Position
    </label>
    <select
      id="position"
      bind:value={position} 
      onclick = {() => filterByProperties({position:position})}
      class={select}
    >
      <option disabled value="">Select Employee Position</option>
      <option value="">All</option>
      {#each employeeList as option}
        <option value={option.position}>{option.position}</option>
      {/each}
    </select>
  </div>
</div>




  <button onclick={()=> filterByProperties({ gender: gender, position: position, firstName: name, lastName: lastName})} class="{submitButton} !w-[80px]">Filter</button>
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
      {#each searchQuery ? data.employeeList.filter(project =>
        String(project?.id ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(project?.firstName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(project?.lastName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(project?.gender ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(project?.position ?? '').toLowerCase().includes(searchQuery.toLowerCase())) : employeeList as employee, index}
        <tr class="hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-150">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{index+1}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"><a href="/dashboard/employees/{employee.id}"> {employee.firstName} {employee.lastName} </a></td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize dark:text-gray-200">{employee.gender}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{employee.position}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm  {employee.isActive ? 'bg-[#008000]' : 'bg-[#ff0000]'} text-white">{employee.isActive ? 'Active' : 'InActive'}</td>
          
        </tr>
      {/each}
    </tbody>
  </table>
</div>



