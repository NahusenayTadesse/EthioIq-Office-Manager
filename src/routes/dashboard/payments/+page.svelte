<script lang='ts'>
  import ChildrenTable from '$lib/ChildrenTable.svelte';



   let { data } = $props();

   let students = $state(data.tutorSessionsRaw);

   let tableHeaders = $state([
    
   
   {name:'Id', key: 'id'},
   {name:'First Name', key: 'firstName'},
   {name:'Last Name', key: 'lastName'},
   {name:'Phone', key: 'phone'},
   {name: 'Status', key: 'status' },
   {name: 'Hourly Rates', key: 'hourlyRate'},
   {name: 'Total Payable Hours', key: 'totalPayableHours'},
    {name: 'Payment', key: 'payment'},
    {name: 'Number of Sessions', key: 'numberOfSessions'},

  
  ]);

 
 
 


</script>

 <svelte:head>
   <title> Payment </title>
 </svelte:head>



Hello
 <div class= "w-4/5 overflow-x-auto p-2">
    <ChildrenTable mainlist= {students} {tableHeaders} />
</div>


