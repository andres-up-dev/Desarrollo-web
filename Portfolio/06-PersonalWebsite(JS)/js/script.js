function addRow() {
  var date = document.getElementById("date").value;
  var start = document.getElementById("time-start").value;
  var end = document.getElementById("time-end").value;
  var activity = document.getElementById("activity").value;
  var place = document.getElementById("place").value;
  var type = document.getElementById("type").value;
  var notes = document.getElementById("notes").value;
  var free = document.getElementById("free").checked;

  var table = document.getElementById("scheduleTable");
  var row = table.insertRow(-1);

  row.insertCell(0).innerHTML = date;
  row.insertCell(1).innerHTML = start;
  row.insertCell(2).innerHTML = end;
  row.insertCell(3).innerHTML = activity;
  row.insertCell(4).innerHTML = place;
  row.insertCell(5).innerHTML = type;
  row.insertCell(6).innerHTML = notes;

  if (free) {
    row.insertCell(7).innerHTML = "Free";
  } else {
    row.insertCell(7).innerHTML = "Busy";
  }
}
