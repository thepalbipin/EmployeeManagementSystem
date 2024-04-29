const deptFilter = document.querySelector("#filterByDept");
const genderFilter = document.querySelector("#filterByGender");
const salarySort = document.querySelector("#sortBySalary");
const productContainer = document.querySelector("#product-container");
const productTable = document.querySelector("#product-table");
const paginationContainer = document.querySelector("#pagination-container");


// fetching product from API
async function fetchEmployeesData(url){
  // cons
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.data);
    const employees = data.data;
    displayData(employees);
  } catch (error) {
    console.log(error);
  }
}

function displayData(employees){
  productTable.innerHTML = "";

  employees.forEach(employee => {
    const employeeCard = createEmployeeCard(employee);
    productTable.append(employeeCard);
  });
}

function createEmployeeCard(employee){
  const employeeCard = document.createElement("tr");
  employeeCard.classList.add("employeeCard");

  const serialNo = document.createElement("td");
  serialNo.innerText = employee.id;

  const employeeName = document.createElement("td");
  employeeName.innerText = employee.name;

  const employeeGender = document.createElement("td");
  employeeGender.innerText = employee.gender;

  const employeeDept = document.createElement("td");
  employeeDept.innerText = employee.department;

  const employeeSalary = document.createElement("td");
  employeeSalary.innerText = employee.salary;

  employeeCard.append(serialNo, employeeName, employeeGender, employeeDept, employeeSalary);

  return employeeCard;
}


function constructURL(){

  let url = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?';

  let hasFilter = false;

  const selectedDept = deptFilter.value;
  if(selectedDept != "all"){
    url += `filterBy=department&filterValue=${deptFilter.value}`;
    hasFilter = true;
  }

  const selectedGender = genderFilter.value;
  if(selectedGender != "both"){
    url += `filterBy=gender&filterValue=${selectedGender}`;
    hasFilter = true;
  }

  const sortSalary = salarySort.value;
  if(sortSalary != "sort"){
    if(hasFilter) {
      url += '&'; // Add '&' if a filter is already applied
    }
    url += `sort=salary&order=${sortSalary}`;
  }


  return url;
}

console.log(constructURL());

function updateData() {
  const url = constructURL();
  fetchEmployeesData(url);
}

deptFilter.addEventListener("change", updateData)

genderFilter.addEventListener("change", updateData)

salarySort.addEventListener("change", updateData)

fetchEmployeesData(constructURL());