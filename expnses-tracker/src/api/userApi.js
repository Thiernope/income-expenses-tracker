const signupUrl = "https://money-tracking-app-20.herokuapp.com/user/register";
const loginUrl = "https://money-tracking-app-20.herokuapp.com/user/login";
const resetLinkUrl = "https://money-tracking-app-20.herokuapp.com/user/reset-link";
export const userRegister = async (formData)=> {
    try {
        const response = await fetch(signupUrl, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
          const data = await response.json();
          console.log("DATA", data)
          return data
    } catch (error) {
        console.log(error)
    }
}


export const userLogin = async(loginData) => {
try {
     const response = await fetch(loginUrl, {
       method: "POST",
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(loginData),
     })
  const data = await response.json();
  return data;

} catch (error) {
  console.log(error)
}
}


export const resetLink = async (formData) => {
  try {
    const response = await fetch(resetLinkUrl, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(formData)
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}
