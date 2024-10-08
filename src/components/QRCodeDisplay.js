import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCodeDisplay.css'; // Import the CSS file

const QRCodeDisplay = ({ url }) => (
  <div className="qr-code-container">
    <h2 className="qr-code-title">Scan to Join the Game:</h2>
    <QRCodeSVG value={url} className="qr-code" />
  </div>
);

export default QRCodeDisplay;
