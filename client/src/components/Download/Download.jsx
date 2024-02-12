import React from 'react';
import axios from 'axios';

const Download = () => {
  const downloadPDF = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      const response = await axios.get(
        'http://localhost:5000/html/convert-into-pdf',
        {
          headers,
          responseType: 'arraybuffer'
        }
      );

      const blob = new Blob([response?.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf');

      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const downloadPNG = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      const response = await axios.get(
        'http://localhost:5000/html/convert-into-png',
        {
          headers,
          responseType: 'arraybuffer'
        }
      );

      const blob = new Blob([response?.data], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.png');

      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PNG:', error);
    }
  };

  return (
    <>
      <div onClick={downloadPNG}>Download PNG</div>
      <div onClick={downloadPDF}>Download PDF</div>
    </>
  );
};

export default Download;
