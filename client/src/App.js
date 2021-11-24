import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

export default function App() {
    const [ formData, setFormData ] = useState({ name: '', receiptId: '', price1: '', price2:'' });

    const createAndDownloadPdf = () => {
        axios.post('http://localhost:5000/create-pdf', formData)
            .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf'});
                saveAs(pdfBlob, 'newPdf.pdf');
            })
    }

    return(
        <div className="App">
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="number" placeholder="Receipt ID" name="receiptid" value={formData.receiptId} onChange={(e) => setFormData({ ...formData, receiptId: e.target.value })} />
            <input type="number" placeholder="Price 1" name="price1" value={formData.price1} onChange={(e) => setFormData({ ...formData, price1: e.target.value })} />
            <input type="number" placeholder="Price 2" name="price2" value={formData.price2} onChange={(e) => setFormData({ ...formData, price2: e.target.value})} />
            <button onClick={() => createAndDownloadPdf()}>Download</button>
        </div>
    )
}