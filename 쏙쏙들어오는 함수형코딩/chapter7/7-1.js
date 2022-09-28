function payrollCalc(employees) {
    return payrollChecks;
}

function payrollCalcSafe(employees) {
    let new_employee = deepCopy(employees)
    let payrollChecks=payrollCalc(new_employee)
    return deepCopy(payrollChecks)
}
