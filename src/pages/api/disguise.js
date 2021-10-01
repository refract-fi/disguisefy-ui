import axios from 'axios';

// const API_URL = process.env.REST_API_URL;
// const API_KEY = process.env.REST_API_KEY;

const API_URL = 'http://localhost:3001';
const API_KEY = 'K4QouFjJu7xawHQq';

export default function handler(req, res) {
  return new Promise(async (resolve, reject) => {
    const id = req.query.id
    const options = {
      headers: {
        'x-api-key': API_KEY
      }
    };

    try {
      if (req.method == 'POST') {
        let response = await axios.post(`${API_URL}/disguises/generate`, req.body, options);
        let disguises = response.data;
        res.status(200).json(disguises);

        // If POST request worked: status == 201
        // If POST failed: status == 500
        // ---> Log error for user
      } else if (req.method == 'GET') {
        let response = await axios.get(`${API_URL}/disguises/url/${id}/balances`, options);
        let disguises = response.data;
        res.status(200).json(disguises);
      } else {
        console.log(`[disguiseHandler Error]: method ${req.method} is not acceptable.`);
      }
    } catch (e) {
      if(e.response.status == 404){
        res.status(404).json({
          "error": "Write custom error"
        })
      }
    } finally {
      // could have better error handling
      resolve();
    }
  });
}