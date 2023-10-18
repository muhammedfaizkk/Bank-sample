
window.onload = function () {

    let name = document.getElementById("pName");
    let logName = JSON.parse(localStorage.getItem("token"));
    let n = JSON.parse(localStorage.getItem(logName));
    name.innerHTML = n.userName;

}





class Bank {
    

    fromAcdetails;
    toAcdetailis;


    createAccount() {

        let userName = document.getElementById("uName").value;
        let userAc = document.getElementById("aNum").value;
        let userEmail = document.getElementById("Uemail").value;
        let userPsw = document.getElementById("pass").value;
        let balance = 40500;

        if (userName != "" && userAc != "" && userEmail != "" && userPsw != "") {
            if (userAc in localStorage) {
               alert("Account number allready exist");
            } else {
                let newAccount = { userName, userAc, userEmail, userPsw, balance, transactions: [{ credit: [] }, { debit: [] }] }
                localStorage.setItem(userAc, JSON.stringify(newAccount));
                window.location.replace("./login.html")
            }
        } else {
            alert("Fill in the blank");
        }
    }


    login() {
        let acNumber = document.getElementById("acNum").value;
        let acPassword = document.getElementById("acPass").value;

        if (acNumber in localStorage) {
            let details = JSON.parse(localStorage.getItem(acNumber))
            // console.log(details.userPsw);
            if (details.userPsw == acPassword) {
                localStorage.setItem("token", JSON.stringify(acNumber))
                window.location.replace("./Dashboard.html");


            } else {
                alert("account number password does not match");
            }

        } else {
            alert("you don't have a account")
        }

    }
    balanceCheck() {
        let balanceCurr = document.getElementById("currBa");
        let logBa = JSON.parse(localStorage.getItem('token'));
        let mybalance = JSON.parse(localStorage.getItem(logBa))
        balanceCurr.innerHTML = '₹ ' + mybalance.balance;

    }

    logout() {
        localStorage.removeItem("token");
        window.location.replace("login.html")
    }


    fundTranfer() {
        let fromAcnumber = JSON.parse(localStorage.getItem('token'))

        // let fromAcnumber = document.getElementById("fAcnum").value;
        let toAcnumber = document.getElementById("toAcnum").value;
        let tranAmmount = parseFloat(document.getElementById("trAmmount").value);

        // console.log(fromAcnumber + " " + toAcnumber + " " + tranAmmount + " ");
        let fromAcdetails = this.fromAcdetails;
        let toAcdetailis = this.toAcdetailis;

        if (toAcnumber != "" && tranAmmount != "") {
            if (fromAcnumber in localStorage && toAcnumber in localStorage) {
                fromAcdetails = JSON.parse(localStorage.getItem(fromAcnumber));
                // console.log(fromAcdetails);
                let fromAccurrbalance = fromAcdetails.balance;
                // console.log(fromAccurrbalance + "gfdsvdvdsfvds");

                let toAcdetailis = JSON.parse(localStorage.getItem(toAcnumber));
                let toAccurrbalance = toAcdetailis.balance;
                // console.log(toAccurrbalance);

                if (tranAmmount <= fromAccurrbalance) {
                    let flag = 0;
                    let tr = tranAmmount;
                    let aftertranseFromac = fromAccurrbalance - tr;
                    fromAcdetails.balance = aftertranseFromac;
                    localStorage.setItem(fromAcnumber, JSON.stringify(fromAcdetails));
                    // console.log(fromAcdetails);
                    let aftertranseFtoac = toAccurrbalance + tr;
                    toAcdetailis.balance = aftertranseFtoac;
                    localStorage.setItem(toAcnumber, JSON.stringify(toAcdetailis));
                    this.debitHiscreditHis(fromAcdetails, toAcdetailis, tr);
                    this.transactionHistory();
                    
                   
                    let b = document.getElementById("signup-pt");
                    b.style.display = "none";
                    let a = document.getElementById("success-alert");
                    a.style.display = "inline";
                    
                
                   
                       
                 
                    
                  
                


                } else {
                    
                    let b = document.getElementById("signup-pt");
                    b.style.display = "none";
                    let er = document.getElementById("err")
                    er.innerHTML = 'insufficiant balance'
                    let a = document.getElementById("error-alert");
                    a.style.display = "inline";
                }


            } else {
                
                let b = document.getElementById("signup-pt");
                b.style.display = "none";
                let er = document.getElementById("err")
                    er.innerHTML = 'Account number not vaild'
                    let a = document.getElementById("error-alert");
                    a.style.display = "inline";
                
            }
        } else {
            alert("please fill the blank")



        }



    }

    debitHiscreditHis(fromTransactionhis, toTransactionhis, trAm) {
        let a = fromTransactionhis.userAc;
        let b = toTransactionhis.userAc;

        fromTransactionhis.transactions[1].debit.push({ to: b, Ammount: trAm });
        localStorage.setItem(a, JSON.stringify(fromTransactionhis))

        toTransactionhis.transactions[0].credit.push({ from: a, Ammount: trAm });
        localStorage.setItem(b, JSON.stringify(toTransactionhis))



    }
    debitTr() {
        var a = document.getElementById('debit-tr');
        if (a.style.display === 'none') {
            a.style.display = " inline-table";
        }
        else {
            a.style.display = "none";
        }






        let loggedUer = JSON.parse(localStorage.getItem('token'))
        let loggedUserdetails = JSON.parse(localStorage.getItem(loggedUer));
        let contentHtml = "";

        // console.log( loggedUserdetails.transactions[1].debit);
        loggedUserdetails.transactions[1].debit.forEach(element => {
            // console.log(element);
            var debit = element.Ammount;// debited amount
            let toDebit = element.to;  // acount number
            let user = loggedUserdetails.userName;
            // console.log(user);
            // console.log(debit);
            // console.log(toDebit);



            contentHtml += `
         <tr>
           <td>${toDebit}</td>
           <td>${user}</td>
           <td id="debitelement-de">${debit}</td>
         </tr>
        `

            document.getElementById("debitTransactions").innerHTML = contentHtml

        })



    }
   
   
    creditTr() {


        var a = document.getElementById('credit-tr');
        if (a.style.display === 'none') {
            a.style.display = " inline-table";
        }
        else {
            a.style.display = "none";
        }
        let loggedUer = JSON.parse(localStorage.getItem('token'))
        let loggedUserdetails = JSON.parse(localStorage.getItem(loggedUer));
        let contentHtml = "";

        // console.log( loggedUserdetails.transactions[0].credit);
        loggedUserdetails.transactions[0].credit.forEach(element => {
            // console.log(element);
            var credit = element.Ammount;// debited amount
            let fromDebit = element.from;  // acount number
            // console.log(fromDebit);
            let user = loggedUserdetails.userName;
            // console.log(user);
            // console.log(credit);
            // console.log(fromDebit);


            contentHtml += `
         <tr>
           <td>${fromDebit}</td>
           <td>${user}</td>
           <td id="creditelement-cr">${credit}</td>
         </tr>
        `

            document.getElementById("creditTransactions").innerHTML = contentHtml;

        })
    }

    transactionHistory() {

        document.addEventListener("DOMContentLoaded", function () {
            let b = document.getElementById('customers');
            // console.log(b);
            if (b.style.display === 'none') {
                b.style.display = " inline-table";
            }
            else {
                b.style.display = "none";
            }
        });


        let loggedUer = JSON.parse(localStorage.getItem('token'));
        let loggedUserdetails = JSON.parse(localStorage.getItem(loggedUer));
        let contentHtml = "";
        // console.log(loggedUserdetails);

        loggedUserdetails.transactions[1].debit.forEach(element => {
            var debit = element.Ammount;// debited amount
            let toDebit = element.to;  // acount number

            //   let debituser = JSON.parse(localStorage.getItem(toDebit))
            //   let fromUserName = debituser.userName;
            // console.log(toDebit);

            contentHtml += `
          <tr>
          <td>${toDebit}</td>
          <td id="debitelement">${debit}</td>
          <td >-</td>
         </tr>
          `
            document.addEventListener("DOMContentLoaded", function () {
                document.getElementById("transactionHistory").innerHTML = contentHtml;
            });


        });

        let creditHtml = "";
        loggedUserdetails.transactions[0].credit.forEach(element => {
            var credit = element.Ammount;
            var fromac = element.from;

            let creditUser = JSON.parse(localStorage.getItem(fromac));
            let toUser = creditUser.userName;

            creditHtml += `
        <tr>
        <td>-</td>
        <td class="ps-3 creditAmount">-</td>
        <td id="creditelement">${credit} </td>
        
        <td>${fromac}</td>
       
        
       </tr>
        `
            document.addEventListener("DOMContentLoaded", function () {
                document.getElementById("transactionHistorytwo").innerHTML = creditHtml;
            })
        })


    }




}



let obj = new Bank();

let url = window.location.pathname;
// console.log(url + 'jhdskahksa');
let pathname = url.split("/");
console.log(pathname);
let path = pathname.pop();
console.log(path);



if (path === "Dashboard.html") {
  if(! ('token' in localStorage)){
    window.location.replace("./login.html");
  }
 
}
if(path === "login.html"){
    if('token' in localStorage){
        window.location.replace("./Dashboard.html");
    }
}




















