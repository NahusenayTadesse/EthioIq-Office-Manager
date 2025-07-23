
<script lang='ts'>
    import { select, submitButton } from "$lib/global.svelte";
	import { ArrowDownWideNarrow, ArrowUpWideNarrow, BrushCleaning, LoaderCircle, Mars, OctagonMinus, RotateCcw, SlidersHorizontal, Venus } from "@lucide/svelte";
    import JSPDF from '$lib/JSPDF.svelte';
    let table = $state();
    
  

   let {mainlist = [{id: 1, firstName: 'Nahusenay', lastName: 'Tadesse', gender:'male', position: 'Website Developer', isActive: true}], tableHeaders = [{name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'lastName', key: 'lastName'},
   {name:'Gender', key: 'gender'},
   {name:'Position', key: 'position'},
   {name: 'Active', key: 'isActive'}], fileName = 'fileName' } = $props();
   let list = $state();
   list = mainlist;
   
   let searchQuery= $state('');
   let hover = $state(false);
   


 


  
 let componentKey = $state(0);

      function reloadComponent() {
        componentKey++;

        list = mainlist;
      }




  function removeColumn(colIndex: number) {
    for (let row of table.rows) {
      if (row.cells.length > colIndex) {
        row.deleteCell(colIndex);
      }
    }
  }
  


 






//Sorter
function sorter(head:string){
   if(head === '')
   return list;
  if (head === 'id')
   return list.sort((a, b) => Number(a.id) - Number(b.id));
  if(head === 'isActive')
   return list.sort((a, b) => (b.isActive - a.isActive));

return list.sort((a,b)=> a[head].localeCompare(b[head]) )
}
//Reverse Sorter

function sorterReverse(head: string){
   if(head === '')
   return list;
  if (head === 'id')
   return list.sort((a, b) => Number(b.id) - Number(a.id));
  if(head === 'isActive')
   return  list.sort((a, b) => (a.isActive - b.isActive));

return list.sort((a,b)=> b[head].localeCompare(a[head]) )
}













// Define searchable fields
const searchableFields = ['id', 'firstName', 'lastName', 'gender', 'position'];

// Filter function
function filterEmployees(employees, query) {
  if (!query) return employees;
  const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(term => term.length > 0);
  if (queryTerms.length === 0) return employees;

  return employees.filter(employee => {
    const fullName = `${employee.firstName ?? ''} ${employee.lastName ?? ''}`.toLowerCase();
    return queryTerms.every(term =>
      searchableFields.some(field =>
        String(employee[field] ?? '').toLowerCase().includes(term)
      ) || fullName.includes(term)
    );
  });
}

 
   
</script>



    <JSPDF {fileName} tableId ='#table' />
Number of Employees: {list.length} <br>


<input type="text" class="{select} !w-[200px] !placeholder:dark:text-white m-2 ml-0" bind:value={searchQuery} placeholder="Search Employees">
 <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-200/20 relative">
      
       {#await mainlist}
           <h1 class="flex flex-row m-2">     Loading Data <LoaderCircle class="animate-spin" /></h1>

        
      {:then list} 

  <table id='table' class="min-w-full divide-y divide-gray-200 dark:divide-gray-200" bind:this = {table}>
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
      No employees found matching "{searchQuery}".
    </td>
  </tr>
      
       {:else}
      {#each Object.values(filterEmployees(list, searchQuery)) as person} 
    
 
        <tr class="hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-150"> 
          
      
        {#each Object.entries(person) as [key, value]}
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

</div>



 