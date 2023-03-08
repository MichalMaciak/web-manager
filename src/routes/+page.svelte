<script lang="ts">
  
	import List from "$lib/List.svelte";
	import Save from "$lib/Save.svelte";
  import SearchDomain from "$lib/StartForm/SearchDomain.svelte";

</script>

<main class="w-screen">

    <SearchDomain />
  <section class="mt-8 px-20">
    <List />
  </section>

  <section class="mt-8 px-20">
    <Save />
  </section>

</main>



