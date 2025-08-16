<script lang='ts'>
	import ChildrenTable from '$lib/ChildrenTable.svelte';




   let { data } = $props();

   let students = $state(data.studentsFees);

   let tableHeaders = $state([
    
   
   {name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'Last Name', key: 'lastName'},
   {name:'Phone', key: 'phone'},
   {name: 'Hourly Rates', key: 'hourlyRate'},
   {name: 'Total Hours tutored', key: 'totalRecurredFees'},
    {name: 'Payment', key: 'payment'},
    {name: 'Number of Sessions', key: 'numberOfSessions'},
  ]);

 
 
 


</script>

 <svelte:head>
   <title> Students Payments</title>
 </svelte:head>

 <h1>Students Pending Payments</h1>
 <div class= "flex flex-col flex-start overflow-x-auto">
<ChildrenTable mainlist= {students} {tableHeaders} link="students" search=true />
</div>


