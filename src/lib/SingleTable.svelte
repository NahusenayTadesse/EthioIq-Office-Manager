
<script>

    import Copy from "$lib/Copy.svelte";
    // import JSPDF from "$lib/JSPDF.svelte"

    let { singleTable, fileName, buttonName,  } = $props();
</script>
<!-- 
 <div class="fixed right-2 top-24">
    <JSPDF {fileName} tableId="#table" {buttonName} />

</div> -->

<table id="table" class="w-full table-auto text-left">
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