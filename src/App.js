import { useState } from "react";
import { GoogleSpreadsheet } from 'google-spreadsheet'

function App() {
  const [formData, setFormData] = useState({})

  //Import environmental varialbles
  const {
    REACT_APP_PRIVATE_KEY,
    REACT_APP_CLIENT_EMAIL,
    REACT_APP_SPREADSHEET_ID,
    REACT_APP_SHEET_ID
  } = process.env

  //creating new object of google spreadsheet
  const doc = new GoogleSpreadsheet(REACT_APP_SPREADSHEET_ID);

  //Function append spreadsheet to add row into google sheet

  const appendSpreadsheet = async (row) => {
    console.log(REACT_APP_CLIENT_EMAIL);
    try {
      await doc.useServiceAccountAuth({
        client_email: REACT_APP_CLIENT_EMAIL,
        private_key: REACT_APP_PRIVATE_KEY,
      });
      await doc.loadInfo();
      console.log(doc.loadInfo());
      const sheet = doc.sheetsById[REACT_APP_SHEET_ID];
      const result = await sheet.addRow(row);
      return result;
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  //end

  const handleInputChange = (event) =>{
    setFormData({...formData,[event.target.name]:event.target.value})
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    appendSpreadsheet(formData)
  }
  return (
    <form className="App" onSubmit={handleSubmit}>
      <h1>FORM SUBMISSION</h1>
      <input type="text" name="name" placeholder="Enter your name..." onChange={handleInputChange}/>
      <input type="text" name="class" placeholder="Enter your class..." onChange={handleInputChange}/>
      <input type="text" name="mark" placeholder="Enter your mark..." onChange={handleInputChange}/>
      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default App;
