
<script lang='ts'>

  import JSPDF from "$lib/JSPDF.svelte";
  import { LoaderCircle } from "@lucide/svelte";
  import ChildrenTable from "$lib/ChildrenTable.svelte";
  import Copy from '$lib/Copy.svelte'
	import { page } from "$app/state";

    let { data } = $props();


    let parents = $state(data.parent);
    let student =  $state(data.student);

    let tableHeaders = $state([
    
   
   {name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'Last Name', key: 'lastName'},
   {name: 'Phone', key: 'phone'},
   {name:'Gender', key: 'gender'},
   {name: 'Notes', key: 'notes'},
   {name: 'Primary', key: 'isPrimary'},

   {name: 'Active', key: 'isActive'}
  
  ]); 

let singleTable = [
    { name: 'Name', value: student.firstName + ' ' + student.lastName },
    { name: 'Gender', value: student.gender },
    { name: 'Age', value: student.age },
    { name: 'Grade', value: student.grade },
    { name: 'Phone', value: student.phone }, // Assuming this is like "Natural" or "Social"
    { name: 'Natural or Social', value: student.naturalOrSocial }, // Assuming this is like "Natural" or "Social"
    { name: 'School', value: student.school },
    { name: 'Fee', value: student.fee },
    { name: 'Location', value: student.location },
    { name: 'Specific Location', value: student.specificLocation },
    { name: 'Notes', value: student.notes },
    { name: 'Active Status', value: student.isActive ? 'Active' : 'Inactive' }
];



  
  
const fileName = `${data.student.firstName} ${data.student.lastName} .pdf`;
const buttonName = `Download ${data.student.firstName} as PDF`
 

</script>
<svelte:head>
   <title> {data.student.firstName} {data.student.lastName}</title>
</svelte:head>
    <div class="fixed right-2 top-24">
    <JSPDF {fileName} tableId="#studentDetail" {buttonName} />

</div>


<div class="min-h-screen py-10">
  <div class="bg-white dark:bg-dark shadow-lg dark:shadow-md dark:shadow-gray-600 rounded-md overflow-hidden max-w-3xl">
    <div class="bg-gradient-to-r from-dark to-black text-white py-6 px-8">
      <h1 class="text-3xl font-bold text-center shadow-sm">Student Details</h1>
    </div>
    <div class="py-8 px-6">
      {#await data}
           <h1 class="flex flex-row m-2">     Loading Parent Data <LoaderCircle class="animate-spin" /></h1>

        
      {:then parent} 
        




       
      <table id="studentDetail" class="w-full table-auto text-left">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
          <tr>
            <th class="py-3 px-4">Detail</th>
            <th class="py-3 px-4">Value</th>
          </tr>
        </thead>
        <tbody class="text-gray-900 dark:text-gray-100">
            {#each singleTable as value}
          <tr>
            <td class="py-3 px-4 font-semibold">{value.name}</td>
            <td class="py-3 px-4 capitalize">
                {#if value.name === 'Phone'} 
                <Copy data={value.value} /> 
                {:else} 
                 {value.value}
                {/if}</td>
          </tr>
             {/each}
          
        </tbody>
      </table>
        {/await}
    </div>
  </div>
</div>

<h1 class="text-4xl font-head">Parents</h1>

 <br /> <br />
 <div class="flex flex-col flex-start">
<ChildrenTable mainlist = {parents} {tableHeaders} />
</div>

