"use client";
import { useRef } from 'react';
import { Download, ArrowLeft } from 'lucide-react';

export default function CertificadoView({ certificado, nombreUsuario, nombreCurso, onBack }) {
  const certRef = useRef(null);

  const handleDownload = () => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Certificado - ${nombreCurso}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Courier New', monospace;
            background: #111;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .cert {
            width: 900px;
            background: white;
            border: 8px solid #1a1a1a;
            position: relative;
            padding: 0;
          }
          .bar { height: 24px; background: #166534; }
          .bar-light { height: 12px; background: #22c55e; }
          .body { padding: 48px 64px; text-align: center; }
          .logo { font-size: 48px; font-weight: bold; color: #166534; margin-bottom: 32px; }
          .subtitle { font-size: 20px; color: #166534; font-weight: bold; margin-bottom: 8px; }
          .name { font-size: 18px; color: #6b7280; margin-bottom: 24px; }
          .por { font-size: 20px; color: #166534; font-weight: bold; margin-bottom: 8px; }
          .course { font-size: 18px; color: #6b7280; margin-bottom: 48px; }
          .footer { display: flex; justify-content: space-between; font-size: 14px; }
          .footer-left { color: #166534; }
          .footer-right { color: #166534; font-weight: bold; }
          span { color: #6b7280; font-weight: normal; }

          
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .bar {
              background: #166534 !important;
            }
            .bar-light {
              background: #22c55e !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="cert">
          <div class="bar"></div>
          <div class="bar-light"></div>
          <div class="body">
            <div class="logo">SkillUp</div>
            <div class="subtitle">Este certificado se otorga a:</div>
            <div class="name">${nombreUsuario}</div>
            <div class="por">Por completar con éxito</div>
            <div class="course">${nombreCurso}</div>
            <div class="footer">
              <div class="footer-left">Emision: <span>${certificado.fecha_emision}</span></div>
              <div class="footer-right">CODIGO: <span>${certificado.codigo_qr_validacion}</span></div>
            </div>
          </div>
          <div class="bar-light"></div>
          <div class="bar"></div>
        </div>
        <script>window.onload = () => { window.print(); }<\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      {/* Botones */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-green-400 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          <Download className="w-5 h-5" />
          Descargar certificado
        </button>
      </div>

      {/* Certificado */}
      <div ref={certRef} className="w-full max-w-4xl bg-white border-8 border-gray-900">
        <div className="h-6 bg-green-800" />
        <div className="h-3 bg-green-500" />
        <div className="py-12 px-16 text-center">
          <h1 className="text-5xl font-bold text-green-800 mb-8" style={{ fontFamily: 'monospace' }}>
            SkillUp
          </h1>
          <p className="text-xl font-bold text-green-800 mb-2">Este certificado se otorga a:</p>
          <p className="text-lg text-gray-500 mb-6">{nombreUsuario}</p>
          <p className="text-xl font-bold text-green-800 mb-2">Por completar con éxito</p>
          <p className="text-lg text-gray-500 mb-12">{nombreCurso}</p>
          <div className="flex justify-between text-sm">
            <span className="text-green-800 font-bold">
              Emision: <span className="text-gray-500 font-normal">{certificado.fecha_emision}</span>
            </span>
            <span className="text-green-800 font-bold">
              CODIGO: <span className="text-gray-500 font-normal">{certificado.codigo_qr_validacion}</span>
            </span>
          </div>
        </div>
        <div className="h-3 bg-green-500" />
        <div className="h-6 bg-green-800" />
      </div>
    </div>
  );
}