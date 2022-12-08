import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <footer
      className="container-fluid text-light py-3 ps-4"
      style={{
        height: 50,
        bottom: 0,
        backgroundColor: '#2c2c2c',
        boxShadow: '0px -20px 40px rgba(0, 0, 0, 0.35)',
      }}
    >
      <span>Sourcery Academy 2022</span>
    </footer>
  );
}
