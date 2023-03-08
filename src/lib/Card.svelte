<script lang="ts">
import { deleteItem } from "$lib/fetch"

export let item:any

let validation = item?.valid ? "inValid" : "Valid";


</script>


<tr>
    <td> 
        <p class="text-xl font-bold p-4">{item?.domain}</p>
    </td>
    <td>
        <p class="p-4"> {validation}</p>
    </td>
    <td> 
        <p class="p-4">{item?.remaining}</p>
    </td>
    <td> 
        <p class="p-4">{item?.expiresDate}</p>
    </td>
    <td>
        <p class="p-4">{item?.dns}</p>
    </td>
    <td>
        <p class="p-4">{item?.ip}</p>
    </td>
    <td>
        <button class="text-xl font-bold p-2 hover:text-rose-600 " on:click={() => {deleteItem(item?.id)}}> X </button>
    </td>
</tr>