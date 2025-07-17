
<script>
    let { data } = $props();
</script>
<h1>Employee Detail</h1>


<h1> Name: {data.employee?.firstName} {data.employee?.lastName}</h1>
<h1> Gender: {data.employee.gender}</h1>
<h1> Date of Birth: {data.employee.birthday}</h1>
<h1> Salary: {data.employee.salary} </h1>
<h1> Position: {data.employee.position}</h1>
<h1> Hired Date: {data.employee.joined}</h1>
<h1> Address: {data.employee.address}</h1>
<h1> Is Employee Active: {data.employee.isActive ? 'Yes' : 'No'}</h1>
