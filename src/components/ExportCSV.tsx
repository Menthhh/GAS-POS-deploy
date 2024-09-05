import React from 'react';
import Papa from 'papaparse';

const ExportCSV = ({ data, fileName, label }) => {
  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const bom = '\uFEFF'; // BOM for UTF-8
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.csv`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="bg-newPrimary text-extra px-4 py-2 rounded-lg drop-shadow-lg hover:bg-[#347EC2] hover:text-white" onClick={handleDownload}>{label}</button>
  );
};

export default ExportCSV;
