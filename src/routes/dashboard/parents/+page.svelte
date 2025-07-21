<script>
   import Table from '$lib/Table.svelte';

   let { data } = $props();

   let employeeList = $state(data.allEmployees);

   let tableHeaders = $state([
    
   
   {name:'Id', key: 'id'},
   {name:'Firs Name', key: 'firstName'},
   {name:'lastName', key: 'lastName'},
   {name:'Gender', key: 'gender'},
   {name:'Position', key: 'position'},
   {name: 'Active', key: 'isActive'}

  
  ]);



  // User-defined order, maybe from UI (e.g., select/drag)
  let columnOrder = $state(['role', 'id', 'name']);
  let reorderedData = $derived(reorderData(employeeList, tableHeaders));

  // Function to reorder keys based on columnOrder
  function reorderData(data, order) {
    return data.map(obj => {
      const reordered = {};
      order.forEach(key => {
        if (key in obj) reordered[key] = obj[key];
      });
      return reordered;
    });
  }

  // Reactive reordered data
  
</script>

<h2>Dynamic Table</h2>

<!-- Column controls (simulate UI) -->
<div style="margin-bottom: 1em;">
  <label>Column Order:
  <select bind:value={tableHeaders} multiple>
    {#each tableHeaders as head}
    <option>{head.name}</option>
    {/each}
  </select>
  </label>
</div>

<table border="1" cellpadding="8">
  <thead>
    <tr>
      {#each columnOrder as col}
        <th>{col}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each reorderedData as row}
      <tr>
        {#each columnOrder as col}
          <td>{row[col]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>


<Table mainlist={employeeList} {tableHeaders} />

