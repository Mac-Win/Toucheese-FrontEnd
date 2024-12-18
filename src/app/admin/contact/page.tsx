"use client";

import ContactList from "./ui/ContactList";

const AdminContactPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        <ContactList />
      </h1>
    </div>
  );
};

export default AdminContactPage;
