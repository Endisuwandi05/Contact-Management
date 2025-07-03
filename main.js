//Array untuk menyimpan kontak
// Kontak terdiri dari nama, email, dan nomor telepon
let contacts = [
  {
    id: Date.now(),
    name: "Endi Suwandi",
    email: "endisuwandi@gmail.com",
    phone: "+6281234567890",
    address: "Jl. Contoh Alamat No. 1, Kota, Indonesia",
  },
  {
    id: Date.now(),
    name: "Rizky Pratama",
    email: "rizky.pratama@example.com",
    phone: "+6281122334455",
    address: "Jl. Kenanga No. 10, Jakarta, Indonesia",
  },
  {
    id: Date.now(),
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    phone: "+6285566778899",
    address: "Jl. Mawar No. 5, Surabaya, Indonesia",
  },
  {
    id: Date.now(),
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@example.com",
    phone: "+6282233445566",
    address: "Jl. Anggrek No. 12, Yogyakarta, Indonesia",
  },
  {
    id: Date.now(),
    name: "Lestari Putri",
    email: "lestari.putri@example.com",
    phone: "+6287788990011",
    address: "Jl. Dahlia No. 8, Semarang, Indonesia",
  },
  {
    id: Date.now(),
    name: "Bagas Saputra",
    email: "bagas.saputra@example.com",
    phone: "+6283344556677",
    address: "Jl. Flamboyan No. 3, Medan, Indonesia",
  },
  {
    id: Date.now(),
    name: "Siti Badriah",
    email: "putri.ayu@example.com",
    phone: "+6289900112233",
    address: "Jl. Bougenville No. 15, Bali, Indonesia",
  },
  {
    id: Date.now(),
    name: "Dimas Prabowo",
    email: "dimas.prabowo@example.com",
    phone: "+6281234567890",
    address: "Jl. Melati No. 20, Bandung, Indonesia",
  },
];

// Fitur menambahkan kontak
function addContact(name, email, phone, address) {
  let contact = {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone,
    address: address,
  };
  contacts.push(contact);
  console.log("Contact added successfully:", contact);
}

// Fitur menampilkan semua kontak
function showAllContacts() {
  if (contacts.length === 0) {
    console.log("No contacts available.");
  } else {
    contacts.forEach((contact) => {
      console.log(
        `
// ID: ${contact.id}:
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
  let foundContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(name.toLowerCase())
  );

  if (foundContacts.length === 0) {
    console.log("No contacts found with that name.");
  } else {
    foundContacts.forEach((contact) => {
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

//Fitur delete contact
function DeleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  console.log("Contact deleted successfully.");
}

showAllContacts();
addContact();
DeleteContact();
