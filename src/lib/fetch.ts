import { writable } from 'svelte/store';
import { isExpired, daysRemaining} from '$lib/utils'
import { loadData } from "$lib/openFile"
import { PUBLIC_WHOISAPI } from '$env/static/public';


export let data:any = writable(null);
export let itemsStore  = writable({})
export let item:any
export let items:any = [];


let id:number
let domain:string
let valid:boolean
let remaining:number
let expiresDate:string
let dns:string[]
let ip:string


const obj = await loadData()
items = JSON.parse(obj);

if (items.length != 0){
  itemsStore.set(items)
}


export const WhoisApi = PUBLIC_WHOISAPI
export const currentDate = new Date().toISOString();

export const fetchDataDomain = async function fetchData($wwwAdress:string, WhoisApi:string) {

    let itemExist = null;
    for (const domain in items) {
      if (items[domain].domain === $wwwAdress) {
        itemExist = items[domain];
        console.log("Domain exist in db")
        break;
      }
    }
    

    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${WhoisApi}&domainName=${$wwwAdress}&outputFormat=json&ip=1`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    data = await response.json();

    if (data.length === 0) {
        console.log('Empty response');
    
    } else {
        NormalizedData()
        return [data, item]
}}


let maxId = Math.max(...Object.values(itemsStore).map(i => i.id=0), 0);


export const NormalizedData = () => {
    
    domain = data?.WhoisRecord?.domainName
    valid = isExpired(currentDate, data?.WhoisRecord?.expiresDateNormalized)
    remaining = daysRemaining(currentDate, data?.WhoisRecord?.expiresDateNormalized || data?.WhoisRecord?.registryData?.expiresDateNormalized)
    expiresDate = data?.WhoisRecord?.expiresDateNormalized || data?.WhoisRecord?.registryData?.expiresDateNormalized
    dns = data?.WhoisRecord?.registryData?.nameServers?.hostNames
    ip = data?.WhoisRecord?.registryData?.ips?.[0] || data?.WhoisRecord?.ips?.[0]

    item = {"id": id, "domain":domain, "valid": valid, "remaining": remaining, "expiresDate": expiresDate, "dns": dns, "ip":ip}
    return item

}


export function addItem() {
  const newItem = NormalizedData();
  const unsubscribe = itemsStore.subscribe((value) => {
    items = value;
  });
  
  itemsStore.update(item => {
    return {
      ...item,
      [newItem.id = ++maxId]: newItem
    };
  });
  unsubscribe();
}

export function deleteItem(id: number) {
  const unsubscribe = itemsStore.subscribe((value) => {
    items = value;
  });

  if (typeof items !== 'object') {
    console.log('items2 is not an object');
    unsubscribe();
    return;
  }

  let itemToDelete:any = null;
  for (const itemId in items) {
    if (items[itemId].id === id) {
      itemToDelete = items[itemId];
      break;
    }
  }

  if (!itemToDelete) {
    console.log(`Item with id ${id} not found.`);
    unsubscribe();
    return;
  }

  itemsStore.update(items => {
    const newItems = { ...items };
    delete newItems[itemToDelete.id];
    return newItems;
  });

  console.log(`Item with id ${id} has been deleted.`);
  unsubscribe();
}
