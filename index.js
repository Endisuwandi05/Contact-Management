// Inisialisasi Array kosong

let contactBook = [];

// Fungsi untuk menambahkan kontak baru
function addContact(name, email, phone) {
  let contact = {
    name: name,
    email: email,
    phone: phone,
  };
  contactBook.push(contact);
  console.log("Contact added successfully");
}

// Fungsi untuk menampilkan semua kontak
function showAllContacts() {
  if (contactBook.length === 0) {
    console.log("No contacts available.");
  } else {
    contactBook.forEach((contact, index) => {
      console.log(
        `Contact ${index + 1}:
    Name: ${contact.name}
    Email: ${contact.email}
    Phone: ${contact.phone}
    `
      );
      console.log(
        "------------------------------------------------------------"
      );
    });
  }
}
