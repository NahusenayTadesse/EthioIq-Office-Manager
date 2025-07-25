<script lang="ts">
	import { page } from "$app/state";
  import { OctagonMinus } from "@lucide/svelte";

     let { mainlist,  tableHeaders = [{name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'lastName', key: 'lastName'},
   {name:'Gender', key: 'gender'},
   {name:'Position', key: 'position'},
   {name: 'Active', key: 'isActive'}]} = $props();
   let list = $state();
   let hover = $state(false);
   let table = $state()
   
   
  function removeColumn(colIndex: number) {
    for (let row of table.rows) {
      if (row.cells.length > colIndex) {
        row.deleteCell(colIndex);
      }
    }
  }
</script>

 
 <table id='table' class="w-1/2 divide-y divide-gray-200 dark:divide-gray-200 justify-self-center"  bind:this = {table}>
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
              {head.name}
            </div>

            {#if hover}

            <div class="flex flex-row">

             <button onclick={() => removeColumn(index)} 
              class="rounded-[50%] absolute right-1 top-2" title='Cut {head} from table'>
              <OctagonMinus size=16 color='red' /></button>


              </div>
              {/if}
              
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-200"  >
        {#if mainlist.length === 0}
  <tr>
    <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
      No children were found.
    </td>
  </tr>
      
       {:else}
      {#each Object.values(mainlist) as person, index} 
    
 
        <tr class="hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-150"> 
          
      
        {#each Object.entries(person) as [key, value]}
          {#if key === 'isActive'}
          <td class="px-6 py-4 whitespace-nowrap text-sm  {value ? 'bg-green-400' : 'bg-red-400'} text-white">{value ? 'Active' : 'InActive'}</td>
          {:else if key === 'id'}
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">{index + 1}</td>
          {:else if key === 'firstName' || key === 'lastName'}

          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize"><a href='/dashboard/{page.url.pathname.includes('students') ? 'parents': 'students'}/{person.id}'>{value}</a></td>

           
          {:else }
          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">{value}</td>
                
         {/if}
          
          
          {/each}
        </tr>
      {/each}
      {/if}
    </tbody>
  </table>