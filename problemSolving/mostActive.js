function mostActive(customers) {
    const customerData = {};
    for(let i = 0; i < customers.length; i++){
        if(customerData[customers[i]]){
            customerData[customers[i]] += 1
        }else {
            customerData[customers[i]] = 1
        }
    }

    const customersThatDidOverFivePercent = [];

    for(const customer in customerData){
        const percentageOfTradesForCustomer = customerData[customer] / customers.length;
        if(percentageOfTradesForCustomer >= 0.05){
            customersThatDidOverFivePercent.push(customer);
        }
    }

    return customersThatDidOverFivePercent.sort();
}

const customers = [
    "Omega",
    "Alpha",
    "Omega",
    "Alpha",
    "Omega",
    "Alpha",
    "Omega",
    "Alpha",
    "Omega",
    "Alpha",
    "Omega",
    "Alpha",
    "Omega",
    "Alpha",
    "Omega",
    "Alpha",
    "Omega",
    "Alpha",
    "Omega",
    "Beta"]

console.log(mostActive(customers));

