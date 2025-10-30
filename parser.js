const fs = require('fs');

if(process.argv.length < 3){ 
    console.error("Usage: node parser.js <input-file>"); //??
    process.exit(1);
}

const filePath = process.argv[2];
const text = fs.readFileSync(filePath, 'utf8'); //?


//Parsing Matching Content 
const CustomerAccount = text.match(/(\d{7}) - (\d{8})/);
const BillDate = text.match(/Bill date:\s*(.+)/);
const BillNumber = text.match(/Bill number:\s*(\d+)/);
const BillPeriod = text.match(/([A-Za-z]{3,9} \d{1,2}, \d{4} to [A-Za-z]{3,9} \d{1,2}, \d{4})/);
const TotalNewCharges = text.match(/Total new charges\s*\$([\d,]+\.\d{2})/);

// Output Content
const result = {
  CustomerNumber: CustomerAccount[1],
  accountNumber:  CustomerAccount[2],
  billDate:       BillDate[1],
  billNumber:     BillNumber[1],
  billPeriod:     BillPeriod[1],
  totalNewCharges:TotalNewCharges[1],
};

//Output
console.log(result);

