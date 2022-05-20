// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let empObj = {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
    return empObj;
  }
  
  function createEmployeeRecords(records) {
    let empArr = [];
    for (const rec of records) {
      empArr.push(createEmployeeRecord(rec));
    }
    return empArr;
  }
  
  function createTimeInEvent(record, timeStamp) {
    let dateArr = timeStamp.split(" ");
    let timeInObj = {
      type: `TimeIn`,
      hour: parseInt(dateArr[1].slice(0, 2) + "00"),
      date: dateArr[0],
    };
    record.timeInEvents.push(timeInObj);
    return record;
  }
  
  function createTimeOutEvent(record, timeStamp) {
    let dateArr = timeStamp.split(" ");
    let timeOutObj = {
      type: `TimeOut`,
      hour: parseInt(dateArr[1].slice(0, 2) + "00"),
      date: dateArr[0],
    };
    record.timeOutEvents.push(timeOutObj);
    return record;
  }
  
  function hoursWorkedOnDate(record, date) {
    let hourOut, hourIn;
    for (const out of record.timeOutEvents) {
      if (out[`date`] === date) {
        hourOut = out["hour"];
      }
    }
  
    for (const inV of record.timeInEvents) {
      if (inV[`date`] === date) {
        hourIn = inV["hour"];
      }
    }
    return (hourOut - hourIn) / 100;
  }
  
  function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
  }
  
  function allWagesFor(object) {
    let dateArr = [];
    for (const punchOut of object.timeOutEvents) {
      dateArr.push(punchOut["date"]);
    }
    let tote = 0;
    for (const date of dateArr) {
      tote += wagesEarnedOnDate(object, date);
    }
    return tote;
  }
  
  function calculatePayroll(array) {
    let payroll = 0;
    for (const emp of array) {
      payroll += allWagesFor(emp);
    }
    return payroll;
  }