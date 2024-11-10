//create a function that user to get data from local storage make it to export

export const  getUserData=()=> {
  const data=  localStorage.getItem("user")
  if(data)
    return JSON.parse(data);
else
  return null
}

