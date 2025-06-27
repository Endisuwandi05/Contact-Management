//Array untuk menyimpan kontak
// Kontak terdiri dari nama, email, dan nomor telepon
let contacts = [
  {
    id: 1,
    name: "Endi Suwandi",
    email: "endisuwandi@gmail.com",
    phone: "+6281234567890",
    address: "Jl. Contoh Alamat No. 1, Kota, Indonesia",
  },
];

// Fitur menambahkan kontak
function addContact(name, email, phone, address) {
  let contact = {
    name: name,
    email: email,
    phone: phone,
    address: address,
  };
  contacts.push(contact);
  console.log("Contact added successfully");
}

// Fitur menampilkan semua kontak
function showAllContacts() {
  if (contacts.length === 0) {
    console.log("No contacts available.");
  } else {
    contacts.forEach((contact, index) => {
      console.log(
        `
ID: ${contact.id}:
Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone}
Address: ${contact.address}`
      );
    });
  }
}

// Fitur mencari kontak berdasarkan  nama
function searchContact(name) {
  let foundContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));

  if (foundContacts.length === 0) {
    console.log("No contacts found with that name.");
  } else {
    foundContacts.forEach((contact, index) => {
      console.log(
        `
ID: ${contact.id}:
Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone}
Address: ${contact.address}`
      );
    });
  }
}

showAllContacts();
