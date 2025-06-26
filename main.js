//Array untuk menyimpan kontak
// Kontak terdiri dari nama, email, dan nomor telepon
let contactBook = [];

// Fitur menambahkan kontak
function addContact(name, email, phone, address) {
  let contact = {
    name: name,
    email: email,
    phone: phone,
    address: address,
  };
  contactBook.push(contact);
  console.log("Contact added successfully");
}

// Fitur menampilkan semua kontak
function showAllContacts() {
  if (contactBook.length === 0) {
    console.log("No contacts available.");
  } else {
    contactBook.forEach((contact, index) => {
      console.log(
        `Contact List:
        Contact ${index + 1}:
    Name: ${contact.name}
    Email: ${contact.email}
    Phone: ${contact.phone}
    Address: ${contact.address}
    "-------------------------------------------------------------"`
      );
    });
  }
}

// Fitur mencari kontak berdasarkan nama
function searchContact(name) {
  let foundContacts = contactBook.filter((contact) =>
    contact.name.toLowerCase().includes(name.toLowerCase())
  );

  if (foundContacts.length === 0) {
    console.log("No contacts found with that name.");
  } else {
    foundContacts.forEach((contact, index) => {
      console.log(
        `Contact ${index + 1}:
    Name: ${contact.name}
    Email: ${contact.email}
    Phone: ${contact.phone}
    Address: ${contact.address}`
      );
    });
  }
}
