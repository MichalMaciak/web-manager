<script lang="ts">
    import { itemsStore } from "$lib/fetch"
	import Card from "./Card.svelte";

</script>


{#if Object.keys($itemsStore).length != 0}

<table class="table-auto">
    <thead>
      <tr class="p-8">
        <th class="p-2">Domain:</th>
        <th class="p-2">Valid:</th>
        <th class="p-2">Remaining time:</th>
        <th class="p-2">Expiration date:</th>
        <th class="p-2">DNS:</th>
        <th class="p-2">IP:</th>
      </tr>
    </thead>
    <tbody>

        {#each Object.values($itemsStore) as item}


                <Card {item}/>
            
            
        {/each}

    </tbody>
</table>
{/if}