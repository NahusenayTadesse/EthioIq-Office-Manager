
<script lang='ts'>
    import { select, submitButton } from "$lib/global.svelte";
    import { page } from "$app/state";
    import {fly} from 'svelte/transition';
    import { ArrowDown, ArrowDownWideNarrow, ArrowUp, ArrowUpWideNarrow, BrushCleaning, Download, LoaderCircle, Mars, OctagonMinus, RotateCcw, SlidersHorizontal, Venus } from "@lucide/svelte";
    import JSPDF from '$lib/JSPDF.svelte';
    import Papa from 'papaparse';
    import Copy from "$lib/Copy.svelte";

    let table = $state();
   
  

    
  

   let { mainlist,  tableHeaders = [{name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'lastName', key: 'lastName'},
   {name:'Gender', key: 'gender'},
   {name:'Position', key: 'position'},
   {name: 'Active', key: 'isActive'}], fileName = 'fileName' } = $props();
   let list = $state();
   list = mainlist;
   
   let searchQuery= $state('');
   let hover = $state(false);
   


 


  
 




  function removeColumn(colIndex: number) {
    for (let row of table.rows) {

        row.deleteCell(colIndex);
      
    }
  }
  


 






//Sorter
function sorter(head: string) {
  if (head === '') return list;

  const sample = list[0]?.[head];

  if (typeof sample === 'number') {
    return list.sort((a, b) => a[head] - b[head]);
  }

  if (typeof sample === 'boolean') {
    return list.sort((a, b) => (b[head] === a[head]) ? 0 : b[head] ? 1 : -1);
  }

  return list.sort((a, b) => String(a[head]).localeCompare(String(b[head])));
}

//Reverse Sorter

function sorterReverse(head: string){
   if(head === '')
   return list;
 const sample = list[0]?.[head];

  if (typeof sample === 'number') {
    return list.sort((a, b) => b[head] - a[head]);
  }

  if (typeof sample === 'boolean') {
    return list.sort((a, b) => (a[head] === b[head]) ? 0 : a[head] ? 1 : -1);
  }


return list.sort((a,b)=> b[head].localeCompare(a[head]) )
}













// Define searchable fields
const searchableFields = ['id', 'firstName', 'lastName', 'gender', 'position', 'phone', 'grade', 'location', 'fee','naturalOrSocial', 'notes','age'];

// Filter function
function filterEmployees(persons, query) {
  if (!query) return persons;
  const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(term => term.length > 0);
  if (queryTerms.length === 0) return persons;

  return persons.filter(person => {
    const fullName = `${person.firstName ?? ''} ${person.lastName ?? ''}`.toLowerCase();
    return queryTerms.every(term =>
      searchableFields.some(field =>
        String(person[field] ?? '').toLowerCase().includes(term)
      ) || fullName.includes(term)
    );
  });
}
 
  function exportJSONtoCSV() {
    const csv = Papa.unparse(mainlist);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url); // Clean up
  }

 let downloadDropdown = $state(false)
   
</script>

     <button onclick = {()=> downloadDropdown =  !downloadDropdown} class="{submitButton} Capitalize !fixed right-4 top-24 flex flex-row gap-2
       justify-center items-center !p-4 z-10 !bg-transparent !text-dark !border-dark 
       dark:!text-white !dark:!bg-transparent dark:!border-white !border-1 " >
      Download
      {#if downloadDropdown} <ArrowUp /> {/if} 
      {#if !downloadDropdown} <ArrowDown /> {/if}
      
      </button>

     {#if downloadDropdown}

     <div 
     class="p-2 border-dark dark:border-white border-1 rounded-lg flex flex-col shadow-lg fixed gap-2 top-42 right-4 z-10" transition:fly={{y:-100 }} >
    
      <JSPDF {fileName} tableId ='#table' />

     <button onclick={exportJSONtoCSV} 
     
     class="{submitButton} Capitalize flex flex-row gap-2 justify-center items-center !p-4 z-10"><Download />  Download CSV</button>
     </div>

     {/if}

Number of Filtered Data: {mainlist.length} <br>


<input type="text" class="{select} !w-[200px] !placeholder:dark:text-white m-2 ml-0" bind:value={searchQuery} placeholder="Search...">

 <div 
 class="rounded-lg shadow-lg border border-gray-200 dark:border-gray-200/20">      
       {#await mainlist}
           <h1 class="flex flex-row m-2">     Loading Data <LoaderCircle class="animate-spin" /></h1>

        
      {:then list} 

<table id='table' class="divide-y divide-gray-200 dark:divide-gray-200" bind:this={table}>
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
              class="rounded-[50%] absolute right-0 top-2" title='Cut {head.name} from table'>
              <OctagonMinus size=16 color='red' /></button>
              </div>
              {/if}
              
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-200"  >
        {#if filterEmployees(list, searchQuery).length === 0}
  <tr>
    <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
      {#if searchQuery === ''}
        Nothing Found
      {:else}
      Nothing found matching "{searchQuery}"

      {/if}
    </td>
  </tr>
      
       {:else}
      {#each Object.values(filterEmployees(list, searchQuery)) as person, index} 
    
 
        <tr class="hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-150"> 
          
      
        {#each Object.entries(person) as [key, value]}
          {#if key === 'isActive'}
          <td class="px-6 py-4 whitespace-nowrap text-sm  {value ? 'bg-green-400' : 'bg-red-400'} text-white">{value ? 'Active' : 'InActive'}</td>
          {:else if key === 'id'}
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">{index + 1}</td>
          {:else if key === 'firstName' || key === 'lastName'}

          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize"><a href='{page.url.pathname}/{person.id}'>{value}</a></td>

          {:else if key === 'phone'} 
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize"> <Copy  data = {value} /></td>

           
          {:else }
          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">{value}</td>
                
         {/if}
          
          
          {/each}
        </tr>
      {/each}
      {/if}
      
  
    </tbody>
  </table>

   {:catch error}
  <div>
    <div  class="px-6 py-4 text-center text-sm text-red-500 te">
      Error loading data: {mainlist.error}
    </div>
  </div>

 
  {/await}




</div>
 