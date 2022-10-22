const saveContacts = (email, id) => {
  const signedInUser = localStorage.getItem("signedInUser");
  const contacts = localStorage.getItem(`${signedInUser}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signedInUser}-contacts`))
    : [];

  const checker = contacts.some((contact) => contact.email === email);
  if (!checker) {
    localStorage.setItem(
      `${signedInUser}-contacts`,
      JSON.stringify([
        ...contacts,
        {
          email,
          id,
        },
      ])
    );
  }
};

export default saveContacts;
