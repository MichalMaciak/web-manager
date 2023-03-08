<script lang="ts">
  import { wwwAdress, showSaveButton } from '$lib/store'
  import { fetchDataDomain, WhoisApi, addItem } from '$lib/fetch'

    let data:any
    let items:any
    let press = false

    function fetchNow(){
      data = fetchDataDomain($wwwAdress, WhoisApi)
    }
    
         
</script>

<section class="flex justify-center items-center flex-col">

<div class="basis-full mb-2 mt-12">
    <form class="w-full text-center" on:submit|preventDefault={() => {
        fetchNow();
        press = false
      }}>
        <input class="border-2 border-slate-100 border-solid py-4 px-8 text-xl" bind:value={$wwwAdress} />
        <button class="border-2 border-slate-100 border-solid py-4 px-8 text-xl bg-blue-300 hover:bg-sky-500 text-slate-100" type="submit">
            Check domain
        </button>
    </form>
</div>

<section class="basis-full mt-2 mb-8">
{#if $wwwAdress == null}

  <div class="basis-full text-center p-8 mb-8">
      <p>Enter domain name </p>
  </div>
  
{:else }

  {#await data }
      <p class="text-xl p-8">Loading...</p>

  {:then data}

    {#if data?.[0]?.WhoisRecord?.dataError === "MISSING_WHOIS_DATA" || data?.[0]?.WhoisRecord?.dataError ===  "INVALID_TLD"}

      <p class="text-xl p-2 text-red-600"><span class="font-bold">MISSING </span>WHOIS DATA</p>
      
    {:else}

      {#if data?.[0]?.WhoisRecord }

              {#if data?.[1]?.expiresDate == false }
              <div class="flex flex-row border-b-blue-300 border-b-2 border-solid">
                <p class="text-xl p-2 text-red-600"><span class="font-bold">Domain {data?.[1]?.domain} is: </span> inValid</p>
              </div>
              {:else}
                <div class="flex flex-row  border-b-blue-300 border-b-2 border-solid">
                <p class="text-xl p-2 text-lime-600"><span class="font-bold">Domain {data?.[1]?.domain} is: </span> Valid</p>

                    {#if data?.[1]?.remaining  === 1}
                        <p class="text-xl p-2">1 day left</p>
                    {:else}
                        <p class="text-xl p-2"><span class="font-bold">{ data?.[1]?.remaining}</span> days left</p>
                    {/if}
                </div>
              {/if}

         
        
        <p class="text-xl p-2 border-b-blue-300 border-b-2 border-solid"><span class="font-bold">Expires Date: </span>
          {data?.[1]?.expiresDate}</p>
        <p class="text-xl p-2 border-b-blue-300 border-b-2 border-solid"><span class="font-bold">DNS: </span>
          {data?.[1]?.dns}</p>
        <p class="text-xl p-2"><span class="font-bold">IP: </span>
          {data?.[1]?.ip}</p>
          
          {#if data?.domain != $wwwAdress && press != true }
            <button on:click={() => {
              items = addItem();
              press = true
              $showSaveButton = true
            }} 
          
              class="border-2 border-slate-100 border-solid mt-4 p-2 text-xl bg-blue-300 hover:bg-sky-500 text-slate-100 w-full" type="submit">
                Save domain
            </button>
          {/if}


      {:else if data?.[0]?.ErrorMessage }

        <p class="text-xl p-2 text-red-600"><span class="font-bold">Error Code: </span>
          {data?.[0]?.ErrorMessage?.errorCode}</p>
        <p class="text-xl p-2 text-red-600"><span class="font-bold">Error: </span>
          {data?.[0]?.ErrorMessage?.msg}</p>

      {/if}

    {/if}

  {:catch error}
    <p class="text-xl p-8 text-red-600" >{error.message}</p>
  {/await}

{/if}
</section>
</section>

