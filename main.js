// === Utility untuk localStorage ===
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

// === Contact CRUD ===
function addContact(contact) {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
}

function deleteContact(index) {
  const contacts = getContacts();
  const removed = contacts.splice(index, 1)[0];

  const trashContacts = getTrashContacts();
  trashContacts.push(removed);
  saveTrashContacts(trashContacts);

  saveContacts(contacts);
  displayContacts(contacts);
}

// === Display List ===
function displayContacts(contacts) {
  const main = document.querySelector("main");
  let contactList = document.createElement("div");
  contactList.className = "grid gap-4 max-w-3xl mx-auto";

  contacts.forEach((contact, index) => {
    let card = document.createElement("div");
    card.className =
      "bg-white shadow p-4 rounded flex justify-between items-center";

    let info = document.createElement("div");
    info.innerHTML = `
            <p class="font-semibold">${contact.name}</p>
            <p class="text-sm text-gray-600">${contact.email}</p>
            <p class="text-sm text-gray-600">${contact.phone}</p>
            <p class="text-sm text-gray-600">${contact.location}</p>
        `;

    let btnGroup = document.createElement("div");
    btnGroup.className = "flex gap-2";

    let editBtn = document.createElement("button");
    editBtn.className = "text-blue-500 hover:text-blue-700";
    editBtn.innerHTML = '<span class="material-icons">edit</span>';
    editBtn.addEventListener("click", () => editContact(index));

    let delBtn = document.createElement("button");
    delBtn.className = "text-red-500 hover:text-red-700";
    delBtn.innerHTML = '<span class="material-icons">delete</span>';
    delBtn.addEventListener("click", () => {
      if (confirm("Pindahkan kontak ini ke Trash?")) {
        deleteContact(index);
      }
    });

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);
    card.appendChild(info);
    card.appendChild(btnGroup);
    contactList.appendChild(card);
  });

  const oldList = document.getElementById("contact-list");
  if (oldList) oldList.remove();

  contactList.id = "contact-list";
  main.appendChild(contactList);
}

// === Edit Contact ===
function editContact(index) {
  const contacts = getContacts();
  const contact = contacts[index];

  localStorage.setItem("editIndex", index);
  localStorage.setItem("editContact", JSON.stringify(contact));
  window.location.href = "add-contact.html";
}

// === Add-Contact Page ===
if (document.getElementById("contact-form")) {
  const editContactData = localStorage.getItem("editContact");
  const editIndex = localStorage.getItem("editIndex");

  if (editContactData && editIndex !== null) {
    const contact = JSON.parse(editContactData);
    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("location").value = contact.location;
  }

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

      if (editIndex !== null) {
        const contacts = getContacts();
        contacts[editIndex] = contact;
        saveContacts(contacts);
        localStorage.removeItem("editIndex");
        localStorage.removeItem("editContact");
        alert("Contact updated successfully!");
      } else {
        addContact(contact);
        alert("Contact saved successfully!");
      }

      window.location.href = "index.html";
    });
}

// === Index Page ===
if (document.getElementById("search-input")) {
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

// === Trash Page ===
if (document.getElementById("trash-container")) {
  const trashContacts = getTrashContacts();
  displayTrashContacts(trashContacts);
}

function displayTrashContacts(trashContacts) {
  const container = document.getElementById("trash-container");
  container.innerHTML = "";

  trashContacts.forEach((contact, index) => {
    let card = document.createElement("div");
    card.className =
      "bg-white shadow p-4 rounded flex justify-between items-center";

    let info = document.createElement("div");
    info.innerHTML = `
            <p class="font-semibold">${contact.name}</p>
            <p class="text-sm text-gray-600">${contact.email}</p>
            <p class="text-sm text-gray-600">${contact.phone}</p>
            <p class="text-sm text-gray-600">${contact.location}</p>
        `;

    let delBtn = document.createElement("button");
    delBtn.className = "text-red-500 hover:text-red-700";
    delBtn.innerHTML = '<span class="material-icons">delete_forever</span>';
    delBtn.addEventListener("click", () => {
      if (confirm("Hapus kontak ini secara permanen?")) {
        trashContacts.splice(index, 1);
        saveTrashContacts(trashContacts);
        displayTrashContacts(trashContacts);
      }
    });

    card.appendChild(info);
    card.appendChild(delBtn);
    container.appendChild(card);
  });
}
