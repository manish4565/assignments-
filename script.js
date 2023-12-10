document.addEventListener('DOMContentLoaded', function() {
  const employeeForm = document.getElementById('employeeForm');
  const employeeTableBody = document.getElementById('employeeTableBody');
  const filterDepartment = document.getElementById('filterDepartment');

  employeeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const employeeName = document.getElementById('employeeName').value;
    const employeeID = document.getElementById('employeeID').value;
    const department = document.getElementById('department').value;
    const experience = parseInt(document.getElementById('experience').value);
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;

    const role = calculateRole(experience);

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${employeeName}</td>
      <td>${employeeID}</td>
      <td>${department}</td>
      <td>${experience}</td>
      <td>${email}</td>
      <td>${mobile}</td>
      <td>${role}</td>
      <td><button class="deleteButton">Delete</button></td>
    `;

    employeeTableBody.appendChild(newRow);

    // Clear form fields after submission
    employeeForm.reset();
  });

  // Event listener for delete buttons
  employeeTableBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteButton')) {
      event.target.closest('tr').remove();
    }
  });

  // Event listener for filter select
  filterDepartment.addEventListener('change', function() {
    const selectedDepartment = filterDepartment.value;

    const rows = employeeTableBody.getElementsByTagName('tr');
    for (const row of rows) {
      if (selectedDepartment === 'all') {
        row.style.display = 'table-row';
      } else {
        const departmentCell = row.getElementsByTagName('td')[2];
        if (departmentCell.innerText === selectedDepartment) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      }
    }
  });

  function calculateRole(experience) {
    if (experience > 5) {
      return 'Senior';
    } else if (experience >= 2 && experience <= 5) {
      return 'Junior';
    } else {
      return 'Fresher';
    }
  }
});
