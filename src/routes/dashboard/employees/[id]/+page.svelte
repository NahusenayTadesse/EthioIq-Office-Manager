
<script lang='ts'>
	import { submitButton } from '$lib/global.svelte.js';
	import { Download } from '@lucide/svelte';
    let { data } = $props();
    import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
  let message = $state('');

const fileName = `${data.employee.firstName} ${data.employee.lastName}.pdf`;
  async function copyPhoneNumber(copied: string) {
    try {
      await navigator.clipboard.writeText(copied);
      message = 'Copied!';
      setTimeout(() => (message = ''), 2000);

    } catch (err) {
      message = 'Failed to copy!';
      console.error(err);
      setTimeout(() => (message = ''), 2000);

    }
  }
function generatedPdf() {
  const doc = new jsPDF();

  autoTable(doc, {
    html: '#employeedetail', 
    styles: {
      font: 'helvetica',         
      fontSize: 10,              
      textColor: [40, 40, 40],   
      halign: 'left',            
      valign: 'middle',          
      cellPadding: 4,            
    },
    headStyles: {
      fillColor: [0, 0, 0],  
      textColor: 255,              
      fontStyle: 'bold',           
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],  // Light gray for alternating rows
    },
    tableLineColor: [200, 200, 200], // Table border color
    tableLineWidth: 0.1,            // Table border width
    margin: { top: 20 },            // Top margin of the table
  });

  doc.save(fileName);
}
</script>
<svelte:head>
   <title> {data.employee.firstName} {data.employee.lastName}</title>
</svelte:head>

    <button class="{submitButton} !w-[300px] !fixed right-4 top-24 flex flex-row gap-2 justify-center items-center !p-4" onclick={generatedPdf}> <Download /> Download {data.employee.firstName} as PDF</button>
       <p class="text-blue-500 fixed right-24
       top-42">{message}</p>

<div class="min-h-screen py-10">
  <div class="bg-white dark:bg-dark shadow-lg dark:shadow-md dark:shadow-gray-600 rounded-md overflow-hidden max-w-3xl mx-auto">
    <div class="bg-gradient-to-r from-dark to-black text-white py-6 px-8">
      <h1 class="text-3xl font-bold text-center shadow-sm">Employee Details</h1>
    </div>
    <div class="py-8 px-6">
      <table id="employeedetail" class="w-full table-auto text-left">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
          <tr>
            <th class="py-3 px-4">Detail</th>
            <th class="py-3 px-4">Value</th>
          </tr>
        </thead>
        <tbody class="text-gray-900 dark:text-gray-100">
          <tr>
            <td class="py-3 px-4 font-semibold">Name</td>
            <td class="py-3 px-4">{data.employee?.firstName} {data.employee?.lastName}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Gender</td>
            <td class="py-3 px-4 capitalize">{data.employee?.gender}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Date of Birth</td>
            <td class="py-3 px-4">{data.employee?.birthday}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Salary</td>
            <td class="py-3 px-4">{data.employee?.salary}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Position</td>
            <td class="py-3 px-4">{data.employee?.position}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Hired Date</td>
            <td class="py-3 px-4">{data.employee?.joined}</td>
          </tr>
          <tr>
             <td class="py-3 px-4 font-semibold">Phone</td>
            <td class="py-3 px-4"><button onclick={()=>copyPhoneNumber(data.employee?.phone)}>{data.employee?.phone}</button> 
            </td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Address</td>
            <td class="py-3 px-4">{data.employee?.address}</td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-semibold">Is Employee Active</td>
            <td class="py-3 px-4">{data.employee?.isActive ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>