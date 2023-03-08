
export const loadData = async () => {
    const response = await fetch('http://localhost:5173/api/loaddata');
    const json = await response.json();
    const data = JSON.stringify(json)
    return data;
  }

