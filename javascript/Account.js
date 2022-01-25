class Account{
constructor(){
    this.init()
}
init=()=>{
    document.querySelector("#signip").addEventListener("click",async()=>{
        let email= document.querySelector("#customerEmail");
        let pass=document.querySelector("#customerPassword")
    let  formData={
            "customer[email]":"mayabk@hmail.co",
            "customer[password]":"123",
            "form_type": "customer_login"
        }
   
    let res = await fetch("https://4c20cf832980c8cb3cee95e62d22a6a9:33a0156b1c23e477d00087a1ac5748a6@mulias-fashion.myshopify.com/admin/api/2022-01/customers.json", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 4c20cf832980c8cb3cee95e62d22a6a9`,
            'X-Shopify-Access-Token': "4c20cf832980c8cb3cee95e62d22a6a9",
        },
        body: JSON.stringify(formData),
      });
      res = await res.json();
      console.log(res,"res");
    
    })

}
}
new Account;

 
  