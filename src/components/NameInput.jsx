const NameInput = ({inputData, userName}) => {
    return (
        <label>
            Name
            <input
              type="text"
              name="name"
              value={userName}
              pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={inputData}
            />
          </label>
    )
}
export default NameInput