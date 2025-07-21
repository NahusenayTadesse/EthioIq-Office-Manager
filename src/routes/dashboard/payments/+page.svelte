<script>
  // Original data
  let data = $state([
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 2, name: 'Jane Doe', role: 'editor' },
  ]);

  // User-defined order, maybe from UI (e.g., select/drag)
  let columnOrder = $state(['role', 'id', 'name']);
  let reorderedData = $derived(reorderData(data, columnOrder));

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
  <label>Column Order:</label>
  <select bind:value={columnOrder} multiple>
    <option value="id">ID</option>
    <option value="name">Name</option>
    <option value="role">Role</option>
  </select>
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
