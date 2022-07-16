function createAccount(pin, amount) {
    // create closure "outer" fn scoped vars here
    let userPIN = pin
    let userAmt = amount || 0



    return {
        checkBalance: function checking(inputPin) {
            // Create locally scoped variables here
            // let inputPIN = pin            
            // console.log("pin and amt", userPIN, userAmt, pin);
            if (inputPin === userPIN) {
                return `$${userAmt}`
            } else {
                return "Invalid PIN."
            }
        },
        deposit: function dep(inputPin, depoAmt) {
            // Create locally scoped variables here
            // let inputPIN = pin            
            // console.log("pin and amt", userPIN, userAmt, pin);
            if (inputPin === userPIN) {
                userAmt = userAmt + depoAmt
                return `Succesfully deposited $${depoAmt}. Current balance: $${userAmt}.`
            } else {
                return "Invalid PIN."
            }
        },
        withdraw: function wit(inputPin, withAmt) {
            // Create locally scoped variables here
            // let inputPIN = pin            
            // console.log("pin and amt", userPIN, userAmt, pin);
            if (inputPin === userPIN) {
                if (userAmt < withAmt) {
                    return "Withdrawal amount exceeds account balance. Transaction cancelled."
                } else {
                    userAmt = userAmt - withAmt
                    return `Succesfully withdrew $${withAmt}. Current balance: $${userAmt}.`
                }
            } else {
                return "Invalid PIN."
            }
        },
        changePin: function change(inputPin, newPin) {
            // Create locally scoped variables here
            // let inputPIN = pin            
            // console.log("pin and amt", userPIN, userAmt, pin);
            if (inputPin === userPIN) {
                userPIN = newPin
                return "PIN successfully changed!"
            } else {
                return "Invalid PIN."
            }
        }

    }

    /***  OUTPUT - 
     * obj{ checkBalance (num or error), 
     * deposit: w/ correct PIN 
     * widtdraw w correcet PIN, decrement money
     * chagnePIN = }
*/
}




module.exports = { createAccount };
