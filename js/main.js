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
  else if (hash.startsWith("#detail-")) {
    const index = parseInt(hash.split("-")[1]);
    renderContactDetail(index);
  } else if (hash.startsWith("#edit-")) {
    const index = parseInt(hash.split("-")[1]);
    renderEditContact(index);
  }
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
 <h1 class="text-3xl font-bold mb-4 flex items-center gap-2">

    <img src="/assets/img/phone-book-contacts-svgrepo-com.svg" alt="Logo" class="w-8 h-8" />
    Contact Management</h1>
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
  app.innerHTML = `<h1 class="text-3xl font-bold mb-4 text-red-500">Trash</h1><div id="trash-list" class="grid gap-4"></div>`;
  displayTrashContacts(getTrashContacts());
}

function renderContactDetail(index) {
  const contacts = getContacts();
  const contact = contacts[index];
  if (!contact) {
    navigate("#home");
    return;
  }
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h1 class="text-2xl font-bold mb-4">${contact.name}</h1>
      <p class="mb-2"><strong>Email:</strong> ${contact.email}</p>
      <p class="mb-2"><strong>Phone:</strong> ${contact.phone}</p>
      <p class="mb-2"><strong>Location:</strong> ${contact.location}</p>
      <button onclick="navigate('#edit-${index}')" class="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">✏️ Edit</button>
      <button onclick="navigate('#home')" class="mt-2 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-700">← Back</button>
    </div>`;
}

function renderEditContact(index) {
  const contacts = getContacts();
  const contact = contacts[index];
  if (!contact) {
    navigate("#home");
    return;
  }
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">Edit Contact</h1>
    <form id="edit-form" class="space-y-4">
      <input type="text" id="name" value="${contact.name}" placeholder="Full Name" required class="w-full p-2 border rounded" />
      <input type="email" id="email" value="${contact.email}" placeholder="Email" required class="w-full p-2 border rounded" />
      <input type="tel" id="phone" value="${contact.phone}" placeholder="Phone" required class="w-full p-2 border rounded" />
      <input type="text" id="location" value="${contact.location}" placeholder="Location" class="w-full p-2 border rounded" />
      <button type="submit" class="bg-green-500 text-white p-2 rounded w-full">Update Contact</button>
    </form>
  `;
  document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    contacts[index] = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
    };
    saveContacts(contacts);
    alert("Contact updated successfully!");
    navigate("#home");
  });
}

function displayContacts(contacts) {
  const container = document.getElementById("contact-list");
  container.innerHTML = "";
  contacts.forEach((contact, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow p-4 rounded flex justify-between items-center";
    card.innerHTML = `
      <div class="flex-1 cursor-pointer" onclick="navigate('#detail-${index}')">
        <p class="font-semibold">${contact.name}</p>
        <p class="text-sm text-gray-600">${contact.email}</p>
        <p class="text-sm text-gray-600">${contact.phone}</p>
        <p class="text-sm text-gray-600">${contact.location}</p>
      </div>
      <div class="flex gap-2">
        <button class="text-yellow-500 hover:text-yellow-700" onclick="event.stopPropagation(); navigate('#edit-${index}')"><span class="material-icons">edit</span></button>
        <button class="text-red-500 hover:text-red-700" onclick="event.stopPropagation(); moveToTrash(${index})"><span class="material-icons">delete</span></button>
      </div>`;
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
//  Fungsi displayTrashContacts
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
  </div>
  <div class="flex gap-2">
    <button class="text-green-500 hover:text-green-700" onclick="restoreContact(${index})">
      <span class="material-icons">restore</span>
    </button>
    <button class="text-red-500 hover:text-red-700" onclick="deleteForever(${index})">
      <span class="material-icons">delete_forever</span>
    </button>
  </div>
`;

    container.appendChild(card);
  });
}
// Fungsi restore kontak
function restoreContact(index) {
  const trashContacts = getTrashContacts();
  const restored = trashContacts.splice(index, 1)[0];
  const contacts = getContacts();
  contacts.push(restored);
  saveTrashContacts(trashContacts);
  saveContacts(contacts);
  alert("Contact restored successfully!");
  navigate("#home");
}
// Validasi hapus permanent
function deleteForever(index) {
  if (
    confirm(
      "Are you sure you want to permanently delete this contact? This action cannot be undone."
    )
  ) {
    const trashContacts = getTrashContacts();
    trashContacts.splice(index, 1);
    saveTrashContacts(trashContacts);
    renderTrash();
  }
}
