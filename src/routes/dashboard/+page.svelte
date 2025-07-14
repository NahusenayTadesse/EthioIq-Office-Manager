
<script>
    let { data } = $props();
</script>

<h1 class="text-center text-5xl text-orange-500">Welcome {data.roleDetails.name} {data.user.name}
</h1>

<p class="text-center"> Your powers are: {data.roleDetails.description}</p>
