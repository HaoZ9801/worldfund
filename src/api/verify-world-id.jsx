// Note: This must be implemented server side

const fs = require("fs");
const storage = "../tempStorage/storage.txt"

const verifyProof = async (proof) => {
  console.log('proof', proof);
  const response = await fetch(
    'https://developer.worldcoin.org/api/v1/verify/app_staging_3e043a412c6f4796590276fd65a4b4cc',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...proof, action: "login-verification"}),
    }
  );

  console.log("Response Status:", response.status);
  const responseBody = await response.json();
  console.log("Verification response:", responseBody)

  if (response.ok) {
    const data = responseBody;
    return data;
  } else {
    const { code, detail } = responseBody;
    throw new Error(`Error Code ${code}: ${detail}`);
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const proof = req.body.proof; // Assuming the proof is sent in the request body
      console.log('Received proof:', proof);
      const verified = await verifyProof({...proof, action: "login-verification"});
      console.log(verified);

      if(verified.success) {
        fs.writeFile(storage, verified.nullifier_hash, (err) => {
          if(err) {
            console.error("Error writing to file: ", err)
          } else {
            console.log("File has been written successfully!")
          }
        })

      }

      res.status(200).json(verified);

    } catch (err) {
      console.error('Error during verification:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}