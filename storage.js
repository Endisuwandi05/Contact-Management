document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;

    const contact = { name, email, phone, location };
    const contacts = JSON.parse(localStorage.getItem("contactBook")) || [];
    contacts.push(contact);
    localStorage.setItem("contactBook", JSON.stringify(contacts));

    window.location.href = "index.html";
  });

function addContact(contact) {
  const contacts = loadContacts() || [];
  contacts.push(contact);
  saveContacts(contacts);
}

function updateContact(updatedContact) {
  let contacts = loadContacts() || [];
  contacts = contacts.map((contact) =>
    contact.id === updatedContact.id ? updatedContact : contact
  );
  saveContacts(contacts);
}

function deleteContact(id) {
  let contacts = loadContacts() || [];
  contacts = contacts.filter((contact) => contact.id !== id);
  saveContacts(contacts);
}
