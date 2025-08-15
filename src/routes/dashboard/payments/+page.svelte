<script lang='ts'>
	import ChildrenTable from '$lib/ChildrenTable.svelte';
	import Table from '$lib/Table.svelte';




   let { data } = $props();

   let students = $state(data.tutorSessionsRaw);

   let tableHeaders = $state([
    
   
   {name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'Last Name', key: 'lastName'},
   {name:'Phone', key: 'phone'},
   {name: 'Hourly Rates', key: 'hourlyRate'},
   {name: 'Total Payable Hours', key: 'totalPayableHours'},
    {name: 'Payment', key: 'payment'},
    {name: 'Number of Sessions', key: 'numberOfSessions'},

  
  ]);

 
 
 


</script>

 <svelte:head>
   <title> Payment </title>
 </svelte:head>
 <div class= "flex flex-col flex-start">
<ChildrenTable mainlist= {students} {tableHeaders} link="tutors" />
</div>


