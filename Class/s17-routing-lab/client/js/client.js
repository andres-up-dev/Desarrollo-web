var token = null;
var output = document.getElementById('output');
var authStatus = document.getElementById('auth-status');

function show(data) {
  output.textContent = JSON.stringify(data, null, 2);
}

function login(role) {
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: role })
  })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.token) {
        token = data.token;
        authStatus.textContent = 'Status: logged in (' + role + ')';
      }
      show(data);
    });
}

function call(url, method, body) {
  var options = { method: method };
  options.headers = { 'Content-Type': 'application/json' };

  if (token) {
    options.headers['Authorization'] = 'Bearer ' + token;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  fetch(url, options)
    .then(function (res) { return res.json(); })
    .then(function (data) { show(data); });
}

// Auth Listeners
document.getElementById('login-user-btn').onclick = function () {
  login('user');
};

document.getElementById('login-admin-btn').onclick = function () {
  login('admin');
};

document.getElementById('clear-token-btn').onclick = function () {
  token = null;
  authStatus.textContent = 'Status: Anonymous (No Token)';
  show({ message: 'Token cleared' });
};

// Request Listeners
document.getElementById('get-all-btn').onclick = function () {
  call('/api/initiatives', 'GET');
};

document.getElementById('get-one-btn').onclick = function () {
  call('/api/initiatives/1', 'GET');
};

document.getElementById('delete-admin-btn').onclick = function () {
  call('/api/initiatives/1', 'DELETE');
};

document.getElementById('trigger-404-btn').onclick = function () {
  call('/api/unknown-route', 'GET');
};

document.getElementById('post-init-btn').onclick = function () {
  var title = document.getElementById('init-title').value;
  var priority = document.getElementById('init-priority').value;
  call('/api/initiatives', 'POST', { title: title, priority: priority });
};
