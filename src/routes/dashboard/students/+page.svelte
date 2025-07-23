<script>
  let persons = [
    { id: 1, name: 'john doe', role: 'admin' },
    { id: 2, name: 'jane smith', role: 'editor' },
    { id: 3, name: 'peter jones', role: 'viewer' },
  ];

  function mutateSingleObjectKey(obj, keyToMove, direction) {
    const keys = Object.keys(obj);
    const keyIndex = keys.indexOf(keyToMove);

    if (keyIndex === -1) {
      return { ...obj }; // Key not found, return a copy
    }

    const newKeys = [...keys];

    if (direction === 'up' && keyIndex > 0) {
      [newKeys[keyIndex], newKeys[keyIndex - 1]] = [newKeys[keyIndex - 1], newKeys[keyIndex]];
    } else if (direction === 'down' && keyIndex < keys.length - 1) {
      [newKeys[keyIndex], newKeys[keyIndex + 1]] = [newKeys[keyIndex + 1], newKeys[keyIndex]];
    }

    const newObj = {};
    newKeys.forEach(key => {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }

  function moveKeyAcrossPersons(key, direction) {
    persons = persons.map(person => mutateSingleObjectKey(person, key, direction));
  }

  $: firstPersonKeys = persons.length > 0 ? Object.keys(persons[0]) : [];
</script>

<h1>Mutate Object Keys Across an Array of Persons in Svelte</h1>

{#if firstPersonKeys.length > 0}
  <div>
    <p>Move keys for all persons:</p>
    {#each firstPersonKeys as key}
      {#if firstPersonKeys.indexOf(key) > 0}
        <button on:click={() => moveKeyAcrossPersons(key, 'up')}>Move {key} Up</button>
      {/if}
      {#if firstPersonKeys.indexOf(key) < firstPersonKeys.length - 1}
        <button on:click={() => moveKeyAcrossPersons(key, 'down')}>Move {key} Down</button>
      {/if}
    {/each}
  </div>
{:else}
  <p>No persons data available.</p>
{/if}

<hr />

<h2>Current Persons Data:</h2>
{#each persons as person}
  <div style="margin-bottom: 20px; border: 1px solid #eee; padding: 10px;">
    <pre>{JSON.stringify(person, null, 2)}</pre>
  </div>
{/each}