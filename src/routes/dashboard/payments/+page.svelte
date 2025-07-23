<script>
  let data = $state([
    { id: 1, name: 'john doe', role: 'admin', position: 'manager', activeStatus: true },
    { id: 2, name: 'jane smith', role: 'editor', position: 'assistant', activeStatus: false },
  ]);

  

  function moveObjectKey(keyToMove, direction) {
    if (!data || data.length === 0) {
      return;
    }

    const firstObjectKeys = Object.keys(data[0]);
    const keyIndex = firstObjectKeys.indexOf(keyToMove);

    if (keyIndex === -1) {
      return; // Key not found
    }

    const newKeys = [...firstObjectKeys];

    if (direction === 'up' && keyIndex > 0) {
      [newKeys[keyIndex], newKeys[keyIndex - 1]] = [newKeys[keyIndex - 1], newKeys[keyIndex]];
    } else if (direction === 'down' && keyIndex < firstObjectKeys.length - 1) {
      [newKeys[keyIndex], newKeys[keyIndex + 1]] = [newKeys[keyIndex + 1], newKeys[keyIndex]];
    }

    data = data.map(obj => {
      const newObj = {};
      newKeys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
        }
      });
      return newObj;
    });
  }

  // Helper function to get keys for dynamic buttons (using keys from the first object)
  function getKeys(obj) {
    if (obj && typeof obj === 'object' && Object.keys(obj).length > 0) {
      return Object.keys(obj);
    }
    return [];
  }

let firstObjectKeys = $derived(getKeys(data[0]));
</script>

<h1>Mutate Object Keys Globally in Svelte</h1>

{#if firstObjectKeys.length > 0}
  <div>
    <p>Move keys across all objects:</p>
    {#each firstObjectKeys as key}
      {#if firstObjectKeys.indexOf(key) > 0}
        <button onclick={() => moveObjectKey(key, 'up')}>Move {key} Up</button>
      {/if}
      {#if firstObjectKeys.indexOf(key) < firstObjectKeys.length - 1}
        <button onclick={() => moveObjectKey(key, 'down')}>Move {key} Down</button>
      {/if}
    {/each}
  </div>
{:else}
  <p>No keys to move as data is empty or objects have no keys.</p>
{/if}

<hr />

<h2>Current Data:</h2>
{#each data as item}
  <div style="margin-bottom: 20px; border: 1px solid #eee; padding: 10px;">
    <pre>{JSON.stringify(item, null, 2)}</pre>

       <ul>
        <li> {item.id}</li>
        <li>{item.name}</li>
        <li>{item.position}</li>
        <li>{item.role}</li>
        <li>{item.activeStatus}</li>
       </ul>
  </div>
{/each}