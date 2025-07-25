
<script lang='ts'>

  import JSPDF from "$lib/JSPDF.svelte";
  import { LoaderCircle } from "@lucide/svelte";
  import ChildrenTable from "$lib/ChildrenTable.svelte";
  import Copy from '$lib/Copy.svelte'
	import { phoneNumber } from "better-auth/plugins";

    let { data } = $props();


    let children = $state(data.children);

    let tableHeaders = $state([
    
   
   {name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'Last Name', key: 'lastName'},
   {name: 'Birthday', key: 'dateOfBirth'},
   {name:'Gender', key: 'gender'},
   {name:'Grade', key: 'grade'},
   {name: 'Natural or Social', key: 'naturalOrSocial'},
   {name: 'School', key: 'school'},
   {name: 'Notes', key: 'notes'},
   {name: 'Active', key: 'isActive'}
  
  ]);


  
  
const fileName = `${data.parent.firstName} ${data.parent.lastName} .pdf`;
const buttonName = `Download ${data.parent.firstName} as PDF`
 

</script>
<svelte:head>
   <title> {data.parent.firstName} {parent.lastName}</title>
</svelte:head>
    <div class="fixed left-64 top-24">
    <JSPDF {fileName} tableId="#employeedetail" {buttonName} />

</div>


<div class="min-h-screen py-10">
  <div class="bg-white dark:bg-dark shadow-lg dark:shadow-md dark:shadow-gray-600 rounded-md overflow-hidden max-w-3xl">
    <div class="bg-gradient-to-r from-dark to-black text-white py-6 px-8">
      <h1 class="text-3xl font-bold text-center shadow-sm">Parent Details</h1>
    </div>
    <div class="py-8 px-6">
      {#await data}
           <h1 class="flex flex-row m-2">     Loading Parent Data <LoaderCircle class="animate-spin" /></h1>

        
      {:then parent} 
        




       
      <table id="employeedetail" class="w-full table-auto text-left">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
          <tr>
            <th class="py-3 px-4">Detail</th>
            <th class="py-3 px-4">Value</th>
          </tr>
        </thead>
        <tbody class="text-gray-900 dark:text-gray-100">
          <tr>
            <td class="py-3 px-4 font-semibold">Name</td>
            <td class="py-3 px-4">{data.parent?.firstName} {data.parent?.lastName}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Gender</td>
            <td class="py-3 px-4 capitalize">{data.parent?.gender}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Date of Birth</td>
            <td class="py-3 px-4">{data.parent?.birthday}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Notes</td>
            <td class="py-3 px-4"><p> {data.parent.notes}</p></td>
            
          </tr>
        
          <tr>
             <td class="py-3 px-4 font-semibold">Phone</td>
            <td class="py-3 px-4"><Copy data={data.phone}  />
            
            </td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Address</td>
            <td class="py-3 px-4">{data.parent?.address}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Is Parent Active</td>
            <td class="py-3 px-4">{data.parent?.isActive ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
        {/await}
    </div>
  </div>
</div>

<h1 class="text-4xl font-head">Students</h1>

 <br /> <br />
 <div class="flex flex-col flex-start">
<ChildrenTable mainlist = {children} {tableHeaders} />
</div>