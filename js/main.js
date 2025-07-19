// main.js untuk Contact Management SPA dengan Tailwind dan Vanilla JS

function navigate(hash) {
  location.hash = hash;
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

function router() {
  const hash = location.hash || "#home";
  if (hash === "#home") renderHome();
  else if (hash === "#add") renderAddContact();
  else if (hash === "#trash") renderTrash();
}

function getContacts() {
  return JSON.parse(localStorage.getItem("contacts")) || [];
}
function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
function getTrashContacts() {
  return JSON.parse(localStorage.getItem("trashContacts")) || [];
}
function saveTrashContacts(trashContacts) {
  localStorage.setItem("trashContacts", JSON.stringify(trashContacts));
}

function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1 class="text-3xl font-bold mb-4">Contact Management</h1>
    <input type="text" id="search-input" placeholder="Search contacts..." class="border p-2 rounded w-full mb-4" />
    <div id="contact-list" class="grid gap-4"></div>
  `;
  const contacts = getContacts();
  displayContacts(contacts);
  document
    .getElementById("search-input")
    .addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      const filtered = contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(keyword) ||
          c.email.toLowerCase().includes(keyword) ||
          c.phone.toLowerCase().includes(keyword) ||
          c.location.toLowerCase().includes(keyword)
      );
      displayContacts(filtered);
    });
}

function renderAddContact() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">Add New Contact</h1>
    <form id="contact-form" class="space-y-4">
      <input type="text" id="name" placeholder="Full Name" required class="w-full p-2 border rounded" />
      <input type="email" id="email" placeholder="Email" required class="w-full p-2 border rounded" />
      <input type="tel" id="phone" placeholder="Phone" required class="w-full p-2 border rounded" />
      <input type="text" id="location" placeholder="Location" class="w-full p-2 border rounded" />
      <select id="label" class="w-full p-2 border rounded">
        <option value="">Select Label</option>
        <option value="Keluarga">Keluarga</option>
        <option value="Teman">Teman</option>
        <option value="Kerja">Kerja</option>
        <option value="Emergency">Emergency</option>
      </select>
      <button type="submit" class="bg-sky-500 text-white p-2 rounded w-full">Save Contact</button>
    </form>
  `;

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const contact = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        label: document.getElementById("label").value,
      };
      const contacts = getContacts();
      contacts.push(contact);
      saveContacts(contacts);
      alert("Contact saved successfully!");
      navigate("#home");
    });
}

function renderTrash() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1 class="text-3xl font-bold mb-4 text-red-500">Trash</h1>
    <div id="trash-list" class="grid gap-4"></div>
  `;
  displayTrashContacts(getTrashContacts());
}

function displayContacts(contacts) {
  const container = document.getElementById("contact-list");
  container.innerHTML = "";
  contacts.forEach((contact, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow p-4 rounded flex justify-between items-center";
    card.innerHTML = `
      <div>
        <p class="font-semibold">${contact.name}</p>
        <p class="text-sm text-gray-600">${contact.email}</p>
        <p class="text-sm text-gray-600">${contact.phone}</p>
        <p class="text-sm text-gray-600">${contact.location}</p>
        <p class="text-sm text-gray-500 italic">${contact.label}</p>
      </div>
      <button class="text-red-500 hover:text-red-700" onclick="moveToTrash(${index})"><span class="material-icons">delete</span></button>
    `;
    container.appendChild(card);
  });
}

function moveToTrash(index) {
  const contacts = getContacts();
  const removed = contacts.splice(index, 1)[0];
  const trashContacts = getTrashContacts();
  trashContacts.push(removed);
  saveContacts(contacts);
  saveTrashContacts(trashContacts);
  renderHome();
}

function displayTrashContacts(trashContacts) {
  const container = document.getElementById("trash-list");
  container.innerHTML = "";
  trashContacts.forEach((contact, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow p-4 rounded flex justify-between items-center";
    card.innerHTML = `
      <div>
        <p class="font-semibold">${contact.name}</p>
        <p class="text-sm text-gray-600">${contact.email}</p>
        <p class="text-sm text-gray-600">${contact.phone}</p>
        <p class="text-sm text-gray-600">${contact.location}</p>
        <p class="text-sm text-gray-500 italic">${contact.label}</p>
      </div>
      <button class="text-red-500 hover:text-red-700" onclick="deleteForever(${index})"><span class="material-icons">delete_forever</span></button>
    `;
    container.appendChild(card);
  });
}

function deleteForever(index) {
  const trashContacts = getTrashContacts();
  trashContacts.splice(index, 1);
  saveTrashContacts(trashContacts);
  renderTrash();
}
