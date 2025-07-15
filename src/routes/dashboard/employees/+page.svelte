
<script>

    let { data } = $props();
</script>

Number of Employees: {data.employeeList.length} <br>

{#each data.employeeList as employee}
    {employee.id} 

    <br />
{/each}
