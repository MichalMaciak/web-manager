import { items } from "$lib/fetch"

export const saveFile = () => {
  fetch('/api/savedata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  })
  .then(response => {
    if (response.ok) {
      console.log('Form data saved successfully');
    } else {
      console.error('Error saving form data:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error saving form data:', error);
  });
};