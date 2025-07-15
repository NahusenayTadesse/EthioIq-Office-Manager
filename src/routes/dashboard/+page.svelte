
<script>
    let { data } = $props();
</script>
<div class="gap-4">
<h1 class="text-center text-2xl lg:text-5xl text-black dark:text-white font-head">Welcome {data.roleDetails.name} {data.user.name}
</h1>

<p class="text-center"> Your powers are: {data.roleDetails.description}</p>
</div>

