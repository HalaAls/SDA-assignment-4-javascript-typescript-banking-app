class Transaction {
    amount: number;
    date : Date; 
    constructor(  amount : number ,  date: Date) {
      this.amount  = amount;
      this.date = date;
    }
  }
  
  class Customer {
    name : string ;
    id : string;
    transactions : Transaction[];
    constructor( name: string ,   id: string) {
      this.name = name;
      this.id = id;
      this.transactions = [];
    }
    getName() {
      return this.name;
    }
    getId() {
      return this.id;
    }
    getTransactions() {
      return this.transactions;
    }
    getBalance() {
      return this.transactions.reduce((balance, currentTrans) => {
        return balance + currentTrans.amount;
        //Remember The 0 passed as the second argument to the reduce method is the initial value of the balance variable
      }, 0);
    }
    addTransactions(amount : number) {
      if (amount > 0) {
        const newTransaction = new Transaction(amount, new Date());
        this.transactions.push(newTransaction);
        console.log(`${this.id}, ${this.name}'s transaction of ${amount} has been added successfully`);
        return true;
      } 
      console.log(`${this.id}, ${this.name}'s transaction of ${amount} has been failed`);
      return false;
    }
  }
  class Branch {
    name : string;
    customers : Customer[];
    constructor(name : string ) {
      this.name = name;
      this.customers = [];
    }
    getName() {
      return this.name;
    }
    getCustomers() {
      return this.customers;
    }
    addCustomer(newCustomer : Customer) {
      if (!this.customers.includes(newCustomer)) {
        this.customers.push(newCustomer);
        console.log(
          `Customer "${newCustomer.getName()}" (ID: ${newCustomer.getId()}) has been added successfully to ${
            this.name
          }.`
        );
        return true;
      } else {
        console.log(
          `Customer "${newCustomer.getName()}" (ID: ${newCustomer.getId()}) already exists in ${
            this.name
          }.`
        );
        return false;
      }
    }
    addCustomerTransaction(customerId : string, amount: number) {
      const customer = this.customers.find(
        (customer) => customer.getId() === customerId
      );
      if (customer) {
        console.log("Customer Transaction Added Successfully");
        return customer.addTransactions(amount);
      }
      return false;
    }
  }
  class Bank {
    name : string;
    branches: Branch[];
    constructor(name:string) {
      this.name = name;
      this.branches = [];
    }
    addBranch(newBranch : Branch) {
      if (!this.branches.includes(newBranch)) {
        this.branches.push(newBranch);
        console.log(`${newBranch.name} has been added successfully`);
        return true;
      }
      console.log(`${newBranch.name} already exists. `);
  
      return false;
    }
    checkBranch(branch : Branch) {
      return this.branches.includes(branch);
      // includes return true or false
    }
    addCustomer(branch: Branch, customer: Customer) {
      if (this.checkBranch(branch)) {
        const branchCustomers = branch.getCustomers();
        const customerExist = branchCustomers.find(
          (c) => c.getId() === customer.getId()
        );
        if (!customerExist) {
          branch.addCustomer(customer);
          return true;
        }
        console.log(
          `Customer "${customer.getName()}" (ID: ${customer.getId()}) already exists in ${
            branch.name
          }.`
        );
        return false;
      }
      return false;
    }
    addCustomerTransaction(branch : Branch, customerId: string, amount: number) {
      if (this.checkBranch(branch)) {
        const branchCustomers = branch.getCustomers();
        const customer = branchCustomers.find(
          (customer) => customer.getId() === customerId
        );
        if (customer) {
          customer.addTransactions(amount);
          return true;
        } else{
          console.log(`Customer with ID ${customerId} does not exist in ${branch.getName()}`);
          return false;
        }
      }
      return false;
    }
    findBranchByName(branchName : string) {
      const lowerBranchName = branchName.toLowerCase();
      const isMatch = this.branches.some((branch) =>
        branch.getName().toLowerCase().includes(lowerBranchName)
      );
      if (isMatch) {
        console.log(`Branches containing "${branchName}" exist.`);
        return true;
      } else {
        console.log(`No branches containing "${branchName}" were found.`);
        return false;
      }
    }
    listCustomers(branch : Branch, includeTransactions: boolean) {
      if (this.checkBranch(branch)) {
        const customerList = branch.getCustomers();
        customerList.forEach((customer) => {
          console.log(`Customer Name: "${customer.getName()}" ID: "${customer.getId()}" at ${branch.getName()}.`);
          if (includeTransactions) {
            const transactions = customer.getTransactions();
            if (transactions.length > 0) {
              console.log("Transactions:");
              transactions.forEach((transaction) => {
                console.log(
                  `Amount: ${transaction.amount}. Date: ${transaction.date}`
                );
              });
            } else {
              console.log("No transactions available for this customer.");
            }
          }
        });
      } else {
        console.log("Branch does not exist.");
      }
    }
    
  }
  
  const arizonaBank = new Bank("Arizona");
  const westBranch = new Branch("West Branch");
  const sunBranch = new Branch("Sun Branch");
  const customer1 = new Customer("John", "1");
  const customer2 = new Customer("Anna", "2");
  const customer3 = new Customer("John", "3");
  
  console.log("\n________________Add Branch________________\n");
  arizonaBank.addBranch(westBranch);
  arizonaBank.addBranch(sunBranch);
  arizonaBank.addBranch(westBranch);
  
  console.log("\n\n________________Find Branch By Name________________\n");
  arizonaBank.findBranchByName("bank");
  arizonaBank.findBranchByName("sun");
  
  console.log("\n\n________________Add Customers________________\n");
  arizonaBank.addCustomer(westBranch, customer1);
  arizonaBank.addCustomer(westBranch, customer3);
  arizonaBank.addCustomer(sunBranch, customer1);
  arizonaBank.addCustomer(sunBranch, customer2);
  
  console.log("\n\n________________Add Customer Transaction________________\n");
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
  arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
  
  console.log("\n\n________________Add Transaction________________\n");
  customer2.addTransactions(1000);
  customer1.addTransactions(-1000);
  
  console.log("\n\n________________Get Balance________________\n");
  console.log(customer1.getBalance());
  console.log(customer2.getBalance());
  
  console.log("\n\n________________List Customers________________\n");
  arizonaBank.listCustomers(westBranch, true);
  arizonaBank.listCustomers(sunBranch, true);
  
  