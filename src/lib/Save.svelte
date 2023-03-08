<script lang="ts">
    import { saveFile } from '$lib/saveFile'
    import { items } from "$lib/fetch"
    import { showSaveButton } from '$lib/store'

    let itemSave:any

    function save() {
      saveFile()
    }

    function showFunction() {
      return $showSaveButton = false
    }
    
    if (items.length == 0){
      showFunction()
    }

</script>

{#if $showSaveButton }
  
<button on:click={() => {
    itemSave = save();
  }} 
    class="border-2 border-slate-100 border-solid mt-4 p-4 text-xl bg-blue-300 hover:bg-sky-500 text-slate-100 w-1/4" type="submit">
      Save list
</button>
{/if}