// import React, { useRef } from 'react';
// import jsPDF from 'jspdf';

// const PDFConverter = () => {
//   const formRef = useRef(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const name = formData.get('name');
//     const lastName = formData.get('lastName');

//     const doc = new jsPDF();
//     doc.text('Form Data', 10, 10);
//     doc.text(`Name: ${name}`, 10, 20);
//     doc.text(`Last Name: ${lastName}`, 10, 30);

//     doc.save('form-data.pdf');
//   };

//   return (
//     <div>
//       <form ref={formRef} onSubmit={handleSubmit}>
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" name="name" required />

//         <label htmlFor="lastName">Last Name:</label>
//         <input type="text" id="lastName" name="lastName" required />

//         <button type="submit">Convert to PDF</button>
//       </form>
//     </div>
//   );
// };

// export default PDFConverter;

import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import AWS from 'aws-sdk';

const PDFConverter = () => {
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const lastName = formData.get('lastName');
    const email = formData.get('email');

    const doc = new jsPDF();
    doc.text('Form Data', 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Last Name: ${lastName}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);

    const pdfData = doc.output('arraybuffer');
    const bucketName = 'your-bucket-name';
    const objectKey = 'form-data.pdf';

    const s3 = new AWS.S3({
      accessKeyId: 'your-access-key-id',
      secretAccessKey: 'your-secret-access-key',
      region: 'your-region',
    });

    await s3
      .putObject({
        Bucket: bucketName,
        Key: objectKey,
        Body: pdfData,
      })
      .promise();

    console.log('PDF uploaded to S3 successfully.');
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <button type="submit">Convert to PDF</button>
      </form>
    </div>
  );
};

export default PDFConverter;
