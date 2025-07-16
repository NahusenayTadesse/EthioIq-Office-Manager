
<script lang='ts'>
    import { input, submitButton } from "$lib/global.svelte";
	import { SlidersHorizontal } from "@lucide/svelte";
	import { fly } from "svelte/transition";

    
 
    let { data } = $props();


    let employeeList = $state(data.employeeList);
    let tableHeaders = ['', 'Name','Gender', 'Position', 'Active'];
    
    let searchQuery= $state('');
    const filterByGender = (gender: String) => {
    employeeList = data.employeeList.filter(emp => emp.gender === gender);
  };
 
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
  let active = $state(true)
    
</script>

Number of Employees: {employeeList.length} <br>




<div class="m-4">
  <button onclick={()=> filter = !filter}><SlidersHorizontal /> </button> 
  {#if filter}
  <div transition:fly={ {x:-200, duration: 600}}>
  <br />

  <label for="dropdown">Gender:</label>
<select  bind:value={gender}>
  <option disabled value=""> Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
 
</select>
  <label for="dropdown">Position:</label>
<select bind:value={position}>
  <option disabled value="">-- Select an option --</option>
  {#each employeeList as option}
    <option value={option.position}>{option.position}</option>
  {/each}
</select>

  <button class="{submitButton} !w-[80px]" onclick={()=> active=!active}>{active ? 'Active' : 'Inactive'}</button>

  <button onclick={()=> filterByProperties({ gender: gender, position: position, firstName: name, lastName: lastName, isActive: active })} class="{submitButton} !w-[80px]">Filter</button>
  <button onclick={()=> employeeList = data.employeeList} class="{submitButton} !w-[80px]">Clear</button>
  
  </div>

  
  {/if}
</div>

  <input type="text" class="{input} !w-[200px]" bind:value={searchQuery} placeholder="Search Employees">

 <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-200/20">
  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-200">
    <thead class="bg-gray-100 dark:bg-black">
      <tr>
        {#each tableHeaders as head }
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
          >
            {head}
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



