// Application State with YOUR ACTUAL DATA
let appState = {
    currentUser: null,
    incentivesData: [
        {
                "invoiceDate": "2025-08-31",
                "client": "Devendra Madan-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 516120.0,
                "consultantMonthlySalary": 233333.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Hemant Kumar-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 680000.0,
                "consultantMonthlySalary": 200000.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Mayank Lal-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 425000.0,
                "consultantMonthlySalary": 150000.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Nitesh Chauhre-Relanto Inc",
                "recruiter": "Zeenat Bano",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 230000.0,
                "consultantMonthlySalary": 140000.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Noor Syed-Robosoft Technologies",
                "recruiter": "Zeenat Bano",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 240000.0,
                "consultantMonthlySalary": 126400.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Amol Jain-Robosoft Technologies",
                "recruiter": "Zeenat Bano",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 220000.0,
                "consultantMonthlySalary": 104761.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Abdul Raseed-Relanto.AI",
                "recruiter": "Zeenat Bano",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 215000.0,
                "consultantMonthlySalary": 0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Ashok Kumar Reddy-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 408000.0,
                "consultantMonthlySalary": 190890.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Hemant Kumar-Mastek",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 71440.0,
                "consultantMonthlySalary": 93180.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Nishant Gupta-Turing",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 273253.75,
                "consultantMonthlySalary": 101808.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-06-30",
                "client": "Ashish Gupta-Fulcrum Digital",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 8000.0,
                "consultantMonthlySalary": 4857.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-07-31",
                "client": "Ashish Gupta-Fulcrum Digital",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 184000.0,
                "consultantMonthlySalary": 111711.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Ashish Gupta-Fulcrum-Digital",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 152000.0,
                "consultantMonthlySalary": 92283.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Amlan Kabiraj-Robosoft Technologies",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 196429.0,
                "consultantMonthlySalary": 105000.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-06-30",
                "client": "Premal Shah-Fulcrum Digital",
                "recruiter": "Sanjana Patel",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 8000.0,
                "consultantMonthlySalary": 4545.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-07-31",
                "client": "Premal Shah-Fulcrum Digital",
                "recruiter": "Sanjana Patel",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 152000.0,
                "consultantMonthlySalary": 104535.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Premal Shah-Fulcrum Digital",
                "recruiter": "Sanjana Patel",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 144000.0,
                "consultantMonthlySalary": 66811.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Udit Agrawal-Robosoft Technologies",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 198000.0,
                "consultantMonthlySalary": 85716.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Uma Gunda-Relanto.AI",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 104762.0,
                "consultantMonthlySalary": 0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-04-30",
                "client": "Dilpreet Singh-Fulcrum Digital",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 137700.0,
                "consultantMonthlySalary": 69333.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-05-31",
                "client": "Dilpreet Singh-Fulcrum Digital",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 129600.0,
                "consultantMonthlySalary": 67097.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-06-30",
                "client": "Dilpreet Singh-Fulcrum Digital",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 180000.0,
                "consultantMonthlySalary": 77333.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-07-31",
                "client": "Dilpreet Singh-Fulcrum Digital",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 180000.0,
                "consultantMonthlySalary": 77419.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Dilpreet Singh-Fulcrum Digital",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 162000.0,
                "consultantMonthlySalary": 87751.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Ankit Bansal-Relanto.AI",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 215000.0,
                "consultantMonthlySalary": 112290.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-07-31",
                "client": "Parikshit Akhawat-Spruce Technology",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 350000.0,
                "consultantMonthlySalary": 180000.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Parikshit Akhawat-Spruce Technology",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 350000.0,
                "consultantMonthlySalary": 180000.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-06-30",
                "client": "Saurav Gupta-Avon Technologies",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 124457.14,
                "consultantMonthlySalary": 53427.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-07-31",
                "client": "Saurav Gupta-Avon Technologies",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 220000.0,
                "consultantMonthlySalary": 111711.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Saurav Gupta-Avon Technologies",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 219999.87,
                "consultantMonthlySalary": 92283.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Debmalya Ghosal-Robosoft Technologies",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 230000.0,
                "consultantMonthlySalary": 100000.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Deepak Sharma-Relanto.AI",
                "recruiter": "Niharika Sahu",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 210000.0,
                "consultantMonthlySalary": 99313.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Rohit Singh-Relanto.AI",
                "recruiter": "Dipika Shrivastava",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 209523.0,
                "consultantMonthlySalary": 85716.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Anant Shende-Relanto.AI",
                "recruiter": "Dipika Shrivastava",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 109524.0,
                "consultantMonthlySalary": 0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Dinesh Kumar-Relanto.AI",
                "recruiter": "Dipika Shrivastava",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 76667.0,
                "consultantMonthlySalary": 0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Nikita Gupta-Robosoft Technologies",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 240000.0,
                "consultantMonthlySalary": 137929.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Ajay Dixit-Nityo Infotech",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 246032.38,
                "consultantMonthlySalary": 50367.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Hemant Babu Chinman-Mastek",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 171456.0,
                "consultantMonthlySalary": 161312.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Rishabh Kumar- Mastek",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 114304.0,
                "consultantMonthlySalary": 112875.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Ananya Sharma-Oxford LLC",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 367200.0,
                "consultantMonthlySalary": 249169.3,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Harshit Gupta-Oxford LLC",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 367200.0,
                "consultantMonthlySalary": 280528.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-08-31",
                "client": "Mayur-Oxford LLC",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 385660.0,
                "consultantMonthlySalary": 288748.0,
                "remarks": "paid in sep"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Devendra Madan-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 426360.0,
                "consultantMonthlySalary": 233333.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Hemant Kumar-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 489600.0,
                "consultantMonthlySalary": 193333.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Mayank Lal-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 340000.0,
                "consultantMonthlySalary": 150000.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Nitesh Chauhre-Relanto Inc",
                "recruiter": "Zeenat Bano",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 230000.0,
                "consultantMonthlySalary": 181129.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Noor Syed-Robosoft Technologies",
                "recruiter": "Zeenat Bano",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 240000.0,
                "consultantMonthlySalary": 136180.0,
                "remarks": "Pay in Nov"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Amol Jain-Robosoft Technologies",
                "recruiter": "Zeenat Bano",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 220000.0,
                "consultantMonthlySalary": 130000.0,
                "remarks": "Pay In Nov"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Abdul Raseed-Relanto.AI",
                "recruiter": "Zeenat Bano",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 166138.0,
                "consultantMonthlySalary": 96577.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Ashok Kumar Reddy-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 408000.0,
                "consultantMonthlySalary": 199980.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Hemant Kumar-Mastek",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 300048.0,
                "consultantMonthlySalary": 181356.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Nishant Gupta-Turing",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 357000.0,
                "consultantMonthlySalary": 133623.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Ashish Gupta-Fulcrum-Digital",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 176000.0,
                "consultantMonthlySalary": 106854.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Amlan Kabiraj-Robosoft Technologies",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 250000.0,
                "consultantMonthlySalary": 142431.0,
                "remarks": "Pay In Nov"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Premal Shah-Fulcrum Digital",
                "recruiter": "Sanjana Patel",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 176000.0,
                "consultantMonthlySalary": 99990.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Udit Agrawal-Robosoft Technologies",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 220000.0,
                "consultantMonthlySalary": 104764.0,
                "remarks": "Pay In Nov"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Rakesh -Rightskale",
                "recruiter": "Ritika Asudani",
                "accountManager": "Zeenat Bano",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 95200.0,
                "consultantMonthlySalary": 38178.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Dilpreet Singh-Fulcrum Digital",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 189000.0,
                "consultantMonthlySalary": 80000.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Ankit Bansal-Relanto.AI",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 234547.0,
                "consultantMonthlySalary": 141840.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Parikshit Akhawat-Spruce Technology",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 349999.8,
                "consultantMonthlySalary": 180000.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Saurav Gupta-Avon Technologies",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 219999.9,
                "consultantMonthlySalary": 67998.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Debmalya Ghosal-Robosoft Technologies",
                "recruiter": "Ritika Asudani",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 230000.0,
                "consultantMonthlySalary": 110000.0,
                "remarks": "Pay In Nov"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Deepak Sharma-Relanto.AI",
                "recruiter": "Niharika Sahu",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 210000.0,
                "consultantMonthlySalary": 114994.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Rohit Singh-Relanto.AI",
                "recruiter": "Dipika Shrivastava",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 203750.0,
                "consultantMonthlySalary": 95240.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Jagat Mishra-Knack System",
                "recruiter": "Dipika Shrivastava",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 45,
                "untaxedInvoicedValue": 89600.0,
                "consultantMonthlySalary": 32480.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Waris Khan-Mastek",
                "recruiter": "Dipika Shrivastava",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 204000.0,
                "consultantMonthlySalary": 150188.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Nikita Gupta-Robosoft Technologies",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 196364.0,
                "consultantMonthlySalary": 73620.0,
                "remarks": "Pay In Nov"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Ajay Dixit-Nityo Infotech",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Chitransh Nawani",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 258333.9,
                "consultantMonthlySalary": 59583.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Hemant Babu Chinman-Mastek",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 214320.0,
                "consultantMonthlySalary": 139140.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Rishabh Kumar- Mastek",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 314336.0,
                "consultantMonthlySalary": 125004.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Ananya Sharma-Oxford LLC",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 330480.0,
                "consultantMonthlySalary": 81810.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Harshit Gupta-Oxford LLC",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 403920.0,
                "consultantMonthlySalary": 100000.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Mayur-Oxford LLC",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 403920.0,
                "consultantMonthlySalary": 100000.0,
                "remarks": "Not Paid"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Yash Agrawal-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 220320.0,
                "consultantMonthlySalary": 72000.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Apurva Ranjan-Mastek ",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 144000.0,
                "consultantMonthlySalary": 115448.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Shubham Maheshwari-Mastek",
                "recruiter": "Soniya Raghuwanshi",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 30,
                "untaxedInvoicedValue": 175000.0,
                "consultantMonthlySalary": 120908.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Shiva Gouri-Oxford LLC",
                "recruiter": "Zeenat Bano",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 394400.0,
                "consultantMonthlySalary": 250000.0,
                "remarks": "paid in oct"
        },
        {
                "invoiceDate": "2025-09-30",
                "client": "Priyanshu Sahu -Oxford LLC",
                "recruiter": "Priyanshu Sahu",
                "accountManager": "Priyanshu Sahu",
                "paymentTerm": 15,
                "untaxedInvoicedValue": 403920.0,
                "consultantMonthlySalary": 133333.0,
                "remarks": "paid in oct"
        }
],
    settings: {
    "defaultIncentiveRate": 0.05,
    "allowedPaymentTerms": "15,30,45,90",
    "currency": "INR"
},
    customRates: [
        {
                "role": "AM",
                "person": "Chitransh Nawani",
                "payoutMonth": "2025-09",
                "rate": 0.06
        },
        {
                "role": "Recruiter",
                "person": "Chitransh Nawani",
                "payoutMonth": "2025-09",
                "rate": 0.06
        },
        {
                "role": "AM",
                "person": "Chitransh Nawani",
                "payoutMonth": "2025-10",
                "rate": 0.06
        },
        {
                "role": "Recruiter",
                "person": "Chitransh Nawani",
                "payoutMonth": "2025-10",
                "rate": 0.06
        }
],
    editingRecordIndex: null
};

// User database - Everyone can be both recruiter and AM
const users = {
    'admin': { password: 'admin123', role: 'admin', name: 'Admin User' },
    'chitransh': { password: 'user123', role: 'user', name: 'Chitransh Nawani' },
    'dipika': { password: 'user123', role: 'user', name: 'Dipika Shrivastava' },
    'niharika': { password: 'user123', role: 'user', name: 'Niharika Sahu' },
    'priyanshu': { password: 'user123', role: 'user', name: 'Priyanshu Sahu' },
    'ritika': { password: 'user123', role: 'user', name: 'Ritika Asudani' },
    'sanjana': { password: 'user123', role: 'user', name: 'Sanjana Patel' },
    'soniya': { password: 'user123', role: 'user', name: 'Soniya Raghuwanshi' },
    'zeenat': { password: 'user123', role: 'user', name: 'Zeenat Bano' },
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setDefaultMonth();
    console.log('App initialized with', appState.incentivesData.length, 'records');
});

// Setup event listeners
function setupEventListeners() {
    // Login
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Dashboard
    document.getElementById('dashboardMonth').addEventListener('change', updateDashboard);

    // Records
    document.getElementById('addRecordBtn').addEventListener('click', openAddRecordModal);
    document.getElementById('searchInput').addEventListener('input', filterRecords);
    document.getElementById('monthFilter').addEventListener('change', filterRecords);
    document.getElementById('recruiterFilter').addEventListener('change', filterRecords);
    document.getElementById('amFilter').addEventListener('change', filterRecords);

    // Modals
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    document.getElementById('cancelBtn').addEventListener('click', closeModals);
    document.getElementById('cancelRateBtn').addEventListener('click', closeModals);
    document.getElementById('recordForm').addEventListener('submit', handleRecordSubmit);
    document.getElementById('rateForm').addEventListener('submit', handleRateSubmit);

    // Settings
    document.getElementById('saveRateBtn').addEventListener('click', saveDefaultRate);
    document.getElementById('addRateBtn').addEventListener('click', openAddRateModal);
}

// Set default month to current month
function setDefaultMonth() {
    const now = new Date();
    const currentMonth = now.toISOString().substring(0, 7);
    document.getElementById('dashboardMonth').value = currentMonth;
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const user = users[username];
    
    if (user && user.password === password && user.role === role) {
        appState.currentUser = { username, role, name: user.name };
        showApp();
    } else {
        alert('Invalid credentials. Please check username, password, and role.');
    }
}

// Handle logout
function handleLogout() {
    appState.currentUser = null;
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appScreen').style.display = 'none';
    document.getElementById('loginForm').reset();
}

// Show app after login
function showApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appScreen').style.display = 'flex';
    
    // Update UI based on role
    const isAdmin = appState.currentUser.role === 'admin';
    const roleDisplay = isAdmin ? 'ADMIN' : 'USER';
    document.getElementById('userInfo').textContent = 
        `${appState.currentUser.name} (${roleDisplay})`;
    
    // Show/hide admin-only elements
    document.getElementById('settingsTab').style.display = isAdmin ? 'block' : 'none';
    document.getElementById('addRecordBtn').style.display = isAdmin ? 'inline-flex' : 'none';
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = isAdmin ? '' : 'none';
    });
    
    // Hide Monthly Summary tab for non-admin users
    const monthlyTab = document.querySelector('[data-tab="monthly"]');
    if (monthlyTab) {
        monthlyTab.style.display = isAdmin ? 'block' : 'none';
    }

    // Load initial data
    updateDashboard();
    loadRecords();
    if (isAdmin) {
        loadMonthlySummary();
        loadSettings();
    }
    populateFilters();
}

// Switch tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // If switching to records tab, reload and apply filters
    if (tabName === 'records') {
        loadRecords();
        // Apply any active filters
        filterRecords();
    }
}

// Calculate incentives
function calculateIncentives(record, payoutMonth) {
    const netProfit = record.untaxedInvoicedValue - record.consultantMonthlySalary;
    const defaultIncentive = netProfit * appState.settings.defaultIncentiveRate;
    
    // Check for custom rates
    const recruiterRate = getCustomRate('Recruiter', record.recruiter, payoutMonth) || 
                         appState.settings.defaultIncentiveRate;
    const amRate = getCustomRate('AM', record.accountManager, payoutMonth) || 
                  appState.settings.defaultIncentiveRate;
    
    const recruiterIncentive = netProfit * recruiterRate;
    const amIncentive = netProfit * amRate;
    
    return {
        netProfit,
        defaultIncentive,
        recruiterIncentive,
        amIncentive,
        recruiterRate,
        amRate
    };
}

// Get custom rate
function getCustomRate(role, person, payoutMonth) {
    const rate = appState.customRates.find(r => 
        r.role === role && 
        r.person === person && 
        r.payoutMonth === payoutMonth
    );
    return rate ? rate.rate : null;
}

// Calculate payout date
function calculatePayoutDate(invoiceDate, paymentTerm) {
    const date = new Date(invoiceDate);
    const term = parseInt(paymentTerm);
    
    // Set to day 1 to avoid date overflow issues (e.g., Aug 31 + 1 month = Oct 1)
    date.setDate(1);
    
    // Add appropriate months based on payment term
    if (term === 45) {
        date.setMonth(date.getMonth() + 2);  // 45 days = 2 months ahead
    } else {
        date.setMonth(date.getMonth() + 1);  // 15/30 days = 1 month ahead
    }
    
    return date.toISOString().substring(0, 7);
}

// Update dashboard
function updateDashboard() {
    const selectedMonth = document.getElementById('dashboardMonth').value;
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;
    
    let totalIncentives = 0;
    let recruiterIncentives = 0;
    let amIncentives = 0;
    let totalProfit = 0;
    let userTotalIncentive = 0; // For non-admin users
    const performersMap = new Map();

    appState.incentivesData.forEach(record => {
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        
        if (payoutMonth === selectedMonth) {
            const calc = calculateIncentives(record, payoutMonth);
            
            // For admin, count everything
            if (isAdmin) {
                totalProfit += calc.netProfit;
                recruiterIncentives += calc.recruiterIncentive;
                amIncentives += calc.amIncentive;
                totalIncentives += calc.recruiterIncentive + calc.amIncentive;
            } else {
                // For non-admin users, calculate their total incentive
                if (record.recruiter === userName) {
                    userTotalIncentive += calc.recruiterIncentive;
                }
                if (record.accountManager === userName) {
                    userTotalIncentive += calc.amIncentive;
                }
            }
            
            // Track ALL performers for top performers list (everyone sees this)
            performersMap.set(record.recruiter, 
                (performersMap.get(record.recruiter) || 0) + calc.recruiterIncentive);
            performersMap.set(record.accountManager, 
                (performersMap.get(record.accountManager) || 0) + calc.amIncentive);
        }
    });

    // Update stats based on role
    if (isAdmin) {
        // Admin sees all metrics
        document.getElementById('totalIncentives').textContent = formatCurrency(totalIncentives);
        document.getElementById('recruiterIncentives').textContent = formatCurrency(recruiterIncentives);
        document.getElementById('amIncentives').textContent = formatCurrency(amIncentives);
        document.getElementById('totalProfit').textContent = formatCurrency(totalProfit);
        
        // Show all stat cards
        document.querySelectorAll('.stat-card').forEach(card => card.style.display = 'flex');
    } else {
        // Non-admin users see only their total incentive
        document.getElementById('totalIncentives').textContent = formatCurrency(userTotalIncentive);
        
        // Hide other stat cards, show only total incentive
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            if (index === 0) { // First card is total incentives
                card.style.display = 'flex';
                // Update label for users
                card.querySelector('.stat-label').textContent = 'Your Total Incentive';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Update top performers - show for EVERYONE
    const sorted = Array.from(performersMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const performersHTML = sorted.map(([name, amount]) => `
        <div class="performer-item">
            <span class="performer-name">${name}</span>
            <span class="performer-amount">${formatCurrency(amount)}</span>
        </div>
    `).join('');
    
    document.getElementById('topPerformers').innerHTML = performersHTML || 
        '<p style="text-align: center; color: var(--text-secondary);">No data for selected month</p>';
}

// Load records
function loadRecords() {
    const tbody = document.getElementById('recordsTableBody');
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;

    let filteredData = appState.incentivesData;

    // For non-admin users, show records where they are recruiter OR account manager
    if (!isAdmin) {
        filteredData = filteredData.filter(r => 
            r.recruiter === userName || r.accountManager === userName
        );
        console.log(`Loaded ${filteredData.length} records for user: ${userName}`);
    } else {
        console.log(`Loaded ${filteredData.length} total records (admin view)`);
    }

    tbody.innerHTML = filteredData.map((record, index) => {
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        const calc = calculateIncentives(record, payoutMonth);
        
        // Find the original index in the full array for admin operations
        const originalIndex = appState.incentivesData.indexOf(record);
        
        return `
            <tr data-payout-month="${payoutMonth}">
                <td>${formatDate(record.invoiceDate)}</td>
                <td>${record.client}</td>
                <td>${record.recruiter}</td>
                <td>${record.accountManager}</td>
                <td>${record.paymentTerm} days</td>
                <td>${formatCurrency(record.untaxedInvoicedValue)}</td>
                <td>${formatCurrency(record.consultantMonthlySalary)}</td>
                <td>${formatCurrency(calc.netProfit)}</td>
                <td>${formatCurrency(calc.recruiterIncentive)}</td>
                <td>${formatCurrency(calc.amIncentive)}</td>
                <td>${record.remarks}</td>
                ${isAdmin ? `
                    <td class="admin-only">
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="editRecord(${originalIndex})" 
                                    style="padding: 6px 12px; font-size: 0.85rem;">Edit</button>
                            <button class="btn btn-danger" onclick="deleteRecord(${originalIndex})">Delete</button>
                        </div>
                    </td>
                ` : ''}
            </tr>
        `;
    }).join('');
    
    console.log('Sample payout months:', 
        filteredData.slice(0, 3).map(r => 
            `${r.invoiceDate} (${r.paymentTerm}d) → ${calculatePayoutDate(r.invoiceDate, r.paymentTerm)}`
        )
    );
}

// Filter records
function filterRecords() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const monthFilter = document.getElementById('monthFilter').value;
    const recruiterFilter = document.getElementById('recruiterFilter').value;
    const amFilter = document.getElementById('amFilter').value;

    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;

    const rows = document.querySelectorAll('#recordsTableBody tr');
    
    // Get the filtered dataset
    let displayedRecords = appState.incentivesData;
    if (!isAdmin) {
        displayedRecords = displayedRecords.filter(r => 
            r.recruiter === userName || r.accountManager === userName
        );
    }
    
    rows.forEach((row, index) => {
        const record = displayedRecords[index];
        if (!record) {
            row.style.display = 'none';
            return;
        }

        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        
        const matchesSearch = !searchTerm || 
            record.client.toLowerCase().includes(searchTerm) ||
            record.recruiter.toLowerCase().includes(searchTerm) ||
            record.accountManager.toLowerCase().includes(searchTerm);
        
        const matchesMonth = !monthFilter || payoutMonth === monthFilter;
        const matchesRecruiter = !recruiterFilter || record.recruiter === recruiterFilter;
        const matchesAM = !amFilter || record.accountManager === amFilter;
        
        // Show row only if all filters match
        const shouldShow = matchesSearch && matchesMonth && matchesRecruiter && matchesAM;
        row.style.display = shouldShow ? '' : 'none';
    });
}

// Populate filters
function populateFilters() {
    const months = new Set();
    const recruiters = new Set();
    const ams = new Set();

    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;

    // Get records to filter - for non-admin, only their records
    let recordsToFilter = appState.incentivesData;
    if (!isAdmin) {
        recordsToFilter = recordsToFilter.filter(r => 
            r.recruiter === userName || r.accountManager === userName
        );
    }

    recordsToFilter.forEach(record => {
        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        months.add(payoutMonth);
        recruiters.add(record.recruiter);
        ams.add(record.accountManager);
    });

    // Month filter
    const monthFilter = document.getElementById('monthFilter');
    monthFilter.innerHTML = '<option value="">All Months</option>' +
        Array.from(months).sort().reverse().map(m => 
            `<option value="${m}">${formatMonth(m)}</option>`
        ).join('');

    // Recruiter filter - for non-admin, only show recruiters from their records
    const recruiterFilter = document.getElementById('recruiterFilter');
    recruiterFilter.innerHTML = '<option value="">All Recruiters</option>' +
        Array.from(recruiters).sort().map(r => 
            `<option value="${r}">${r}</option>`
        ).join('');

    // AM filter - for non-admin, only show AMs from their records
    const amFilter = document.getElementById('amFilter');
    amFilter.innerHTML = '<option value="">All Account Managers</option>' +
        Array.from(ams).sort().map(a => 
            `<option value="${a}">${a}</option>`
        ).join('');
}

// Load monthly summary
function loadMonthlySummary() {
    const monthlyData = new Map();
    const isAdmin = appState.currentUser.role === 'admin';
    const userName = appState.currentUser.name;

    appState.incentivesData.forEach(record => {
        // For non-admin, only include records where they're involved
        if (!isAdmin && record.recruiter !== userName && record.accountManager !== userName) {
            return;
        }

        const payoutMonth = calculatePayoutDate(record.invoiceDate, record.paymentTerm);
        const calc = calculateIncentives(record, payoutMonth);
        
        if (!monthlyData.has(payoutMonth)) {
            monthlyData.set(payoutMonth, {
                totalProfit: 0,
                recruiterIncentives: 0,
                amIncentives: 0
            });
        }
        
        const data = monthlyData.get(payoutMonth);
        data.totalProfit += calc.netProfit;
        data.recruiterIncentives += calc.recruiterIncentive;
        data.amIncentives += calc.amIncentive;
    });

    const sorted = Array.from(monthlyData.entries()).sort((a, b) => b[0].localeCompare(a[0]));
    
    const tbody = document.getElementById('monthlyTableBody');
    tbody.innerHTML = sorted.map(([month, data]) => `
        <tr>
            <td>${formatMonth(month)}</td>
            <td>${formatCurrency(data.totalProfit)}</td>
            <td>${formatCurrency(data.recruiterIncentives)}</td>
            <td>${formatCurrency(data.amIncentives)}</td>
            <td><strong>${formatCurrency(data.recruiterIncentives + data.amIncentives)}</strong></td>
        </tr>
    `).join('');
}

// Modal functions
function openAddRecordModal() {
    appState.editingRecordIndex = null;
    document.getElementById('modalTitle').textContent = 'Add New Record';
    document.getElementById('recordForm').reset();
    document.getElementById('recordModal').classList.add('show');
}

function editRecord(index) {
    appState.editingRecordIndex = index;
    const record = appState.incentivesData[index];
    
    document.getElementById('modalTitle').textContent = 'Edit Record';
    const form = document.getElementById('recordForm');
    form.invoiceDate.value = record.invoiceDate;
    form.client.value = record.client;
    form.recruiter.value = record.recruiter;
    form.accountManager.value = record.accountManager;
    form.paymentTerm.value = record.paymentTerm;
    form.untaxedInvoicedValue.value = record.untaxedInvoicedValue;
    form.consultantMonthlySalary.value = record.consultantMonthlySalary;
    form.remarks.value = record.remarks;
    
    document.getElementById('recordModal').classList.add('show');
}

function deleteRecord(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        appState.incentivesData.splice(index, 1);
        loadRecords();
        updateDashboard();
        loadMonthlySummary();
        populateFilters();
    }
}

function handleRecordSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const record = {
        invoiceDate: formData.get('invoiceDate'),
        client: formData.get('client'),
        recruiter: formData.get('recruiter'),
        accountManager: formData.get('accountManager'),
        paymentTerm: parseInt(formData.get('paymentTerm')),
        untaxedInvoicedValue: parseFloat(formData.get('untaxedInvoicedValue')),
        consultantMonthlySalary: parseFloat(formData.get('consultantMonthlySalary')),
        remarks: formData.get('remarks')
    };
    
    if (appState.editingRecordIndex !== null) {
        appState.incentivesData[appState.editingRecordIndex] = record;
    } else {
        appState.incentivesData.push(record);
    }
    
    closeModals();
    loadRecords();
    updateDashboard();
    loadMonthlySummary();
    populateFilters();
}

function openAddRateModal() {
    document.getElementById('rateForm').reset();
    document.getElementById('rateModal').classList.add('show');
}

function handleRateSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const rate = {
        role: formData.get('role'),
        person: formData.get('person'),
        payoutMonth: formData.get('payoutMonth'),
        rate: parseFloat(formData.get('rate'))
    };
    
    appState.customRates.push(rate);
    closeModals();
    loadSettings();
    updateDashboard();
    loadRecords();
}

function closeModals() {
    document.getElementById('recordModal').classList.remove('show');
    document.getElementById('rateModal').classList.remove('show');
}

// Settings functions
function loadSettings() {
    document.getElementById('defaultRate').value = appState.settings.defaultIncentiveRate;
    
    const ratesHTML = `
        <table>
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Person</th>
                    <th>Month</th>
                    <th>Rate</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${appState.customRates.map((rate, index) => `
                    <tr>
                        <td>${rate.role}</td>
                        <td>${rate.person}</td>
                        <td>${formatMonth(rate.payoutMonth)}</td>
                        <td>${(rate.rate * 100).toFixed(2)}%</td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteRate(${index})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    document.getElementById('customRatesTable').innerHTML = ratesHTML;
}

function saveDefaultRate() {
    const newRate = parseFloat(document.getElementById('defaultRate').value);
    if (newRate >= 0 && newRate <= 1) {
        appState.settings.defaultIncentiveRate = newRate;
        alert('Default rate updated successfully!');
        updateDashboard();
        loadRecords();
    } else {
        alert('Please enter a valid rate between 0 and 1');
    }
}

function deleteRate(index) {
    if (confirm('Are you sure you want to delete this custom rate?')) {
        appState.customRates.splice(index, 1);
        loadSettings();
        updateDashboard();
        loadRecords();
    }
}

// Utility functions
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatMonth(monthString) {
    const [year, month] = monthString.split('-');
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long' });
}
