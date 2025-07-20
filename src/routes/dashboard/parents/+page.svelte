<script>
  import { onMount } from 'svelte';

  // Reactive table data
  let tableData = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9']
  ];

  // Function to move a row up
  function moveRowUp(index) {
    if (index > 0) {
      [tableData[index], tableData[index - 1]] = [tableData[index - 1], tableData[index]];
      tableData = [...tableData]; // Trigger reactivity
    }
  }

  // Function to move a row down
  function moveRowDown(index) {
    if (index < tableData.length - 1) {
      [tableData[index], tableData[index + 1]] = [tableData[index + 1], tableData[index]];
      tableData = [...tableData]; // Trigger reactivity
    }
  }

  // Function to move a column left
  function moveColumnLeft(index) {
    if (index > 0) {
      tableData = tableData.map(row => {
        [row[index], row[index - 1]] = [row[index - 1], row[index]];
        return [...row];
      });
    }
  }

  // Function to move a column right
  function moveColumnRight(index) {
    if (index < tableData[0].length - 1) {
      tableData = tableData.map(row => {
        [row[index], row[index + 1]] = [row[index + 1], row[index]];
        return [...row];
      });
    }
  }
</script>

<style>
  table {
    border-collapse: collapse;
    margin: 20px 0;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  button {
    margin: 2px;
    padding: 5px 10px;
  }
</style>

<table>
  <thead>
    <tr>
      {#each tableData[0] as _, colIndex}
        <th>
          Column {colIndex + 1}
          <div>
            {#if colIndex > 0}
              <button on:click={() => moveColumnLeft(colIndex)}>←</button>
            {/if}
            {#if colIndex < tableData[0].length - 1}
              <button on:click={() => moveColumnRight(colIndex)}>→</button>
            {/if}
          </div>
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each tableData as row, rowIndex}
      <tr>
        {#each row as cell, colIndex}
          <td>{cell}</td>
        {/each}
        <td>
          {#if rowIndex > 0}
            <button on:click={() => moveRowUp(rowIndex)}>↑</button>
          {/if}
          {#if rowIndex < tableData.length - 1}
            <button on:click={() => moveRowDown(rowIndex)}>↓</button>

            {/if}

        </td>
        
      </tr>
       {/each}
      </tbody>
      </table>