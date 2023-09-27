const ContactList = ({ contacts, onDeleteItem }) => {
  return (
    <div>
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contact.id} className="contact-item">
            <p className="contact-name">Name: {contact.name}</p>
            <p className="contact-number">Number: {contact.number}</p>
            <button type="button" onClick={() => onDeleteItem(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactList;
