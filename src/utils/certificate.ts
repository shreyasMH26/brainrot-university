import type { Certificate } from '../types';

export interface CertificateGenerateOptions {
  certificate: Certificate;
  studentName: string;
}

export function generateCertificateHTML(cert: Certificate): string {
  const date = new Date(cert.issuedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=IM+Fell+English+SC&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      width: 1122px;
      height: 793px;
      background: #F0EBDD;
      font-family: Georgia, serif;
      overflow: hidden;
    }

    .certificate {
      width: 1122px;
      height: 793px;
      padding: 40px;
      position: relative;
      background: #F0EBDD;
    }

    .outer-border {
      width: 100%;
      height: 100%;
      border: 4px solid #641C2B;
      position: relative;
    }

    .inner-border {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
      border: 1px solid #641C2B;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px 80px;
      text-align: center;
    }

    .university-name {
      font-family: Georgia, serif;
      font-size: 11px;
      letter-spacing: 6px;
      text-transform: uppercase;
      color: #641C2B;
      margin-bottom: 6px;
    }

    .crest {
      font-size: 48px;
      margin: 8px 0;
    }

    .cert-title {
      font-size: 9px;
      letter-spacing: 5px;
      color: #641C2B;
      text-transform: uppercase;
      margin-bottom: 12px;
      border-top: 1px solid #641C2B;
      border-bottom: 1px solid #641C2B;
      padding: 4px 20px;
    }

    .certify-text {
      font-size: 13px;
      color: #2a2a2a;
      font-style: italic;
      margin-bottom: 10px;
    }

    .student-name {
      font-size: 42px;
      font-family: Georgia, serif;
      font-style: italic;
      color: #090909;
      margin-bottom: 10px;
      border-bottom: 1px solid #641C2B;
      padding-bottom: 6px;
      min-width: 300px;
    }

    .survived-text {
      font-size: 12px;
      color: #2a2a2a;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .course-title {
      font-size: 24px;
      font-family: Georgia, serif;
      font-weight: bold;
      color: #090909;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }

    .distinction-text {
      font-size: 11px;
      color: #2a2a2a;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }

    .grade {
      font-size: 18px;
      font-family: Georgia, serif;
      font-weight: bold;
      color: #641C2B;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }

    .details-row {
      display: flex;
      gap: 60px;
      justify-content: center;
      margin-bottom: 16px;
    }

    .detail {
      text-align: center;
    }

    .detail-label {
      font-size: 8px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #641C2B;
      display: block;
      margin-bottom: 3px;
    }

    .detail-value {
      font-size: 11px;
      color: #090909;
    }

    .signature-row {
      display: flex;
      gap: 80px;
      justify-content: center;
      align-items: flex-end;
      margin-top: 10px;
    }

    .signature-block {
      text-align: center;
    }

    .signature-name {
      font-size: 14px;
      font-style: italic;
      color: #090909;
      border-bottom: 1px solid #090909;
      padding-bottom: 4px;
      margin-bottom: 4px;
    }

    .signature-title {
      font-size: 8px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #641C2B;
    }

    .disclaimer {
      font-size: 8px;
      color: #888;
      font-style: italic;
      margin-top: 16px;
      max-width: 700px;
    }

    .corner-ornament {
      position: absolute;
      font-size: 22px;
      color: #641C2B;
    }

    .corner-ornament.tl { top: 16px; left: 16px; }
    .corner-ornament.tr { top: 16px; right: 16px; }
    .corner-ornament.bl { bottom: 16px; left: 16px; }
    .corner-ornament.br { bottom: 16px; right: 16px; }

    .dept-name {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
<div class="certificate">
  <div class="outer-border">
    <div class="inner-border"></div>
    <div class="content">
      <div class="corner-ornament tl">✦</div>
      <div class="corner-ornament tr">✦</div>
      <div class="corner-ornament bl">✦</div>
      <div class="corner-ornament br">✦</div>

      <div class="university-name">Brainrot University · Est. Never</div>
      <div class="crest">☠️</div>
      <div class="cert-title">Certificate of Questionable Achievement</div>

      <p class="certify-text">This hereby certifies that</p>
      <div class="student-name">${cert.studentName}</div>
      <p class="survived-text">has successfully survived</p>
      <div class="dept-name">${cert.departmentName}</div>
      <div class="course-title">${cert.courseTitle}</div>
      <p class="distinction-text">with the academic distinction of</p>
      <div class="grade">${cert.gradeLabel}</div>

      <div class="details-row">
        <div class="detail">
          <span class="detail-label">Awarded On</span>
          <span class="detail-value">${date}</span>
        </div>
        <div class="detail">
          <span class="detail-label">Certificate ID</span>
          <span class="detail-value">${cert.certificateCode}</span>
        </div>
      </div>

      <div class="signature-row">
        <div class="signature-block">
          <div class="signature-name">Professor Braincell</div>
          <div class="signature-title">Dean of Absolutely Nothing</div>
        </div>
        <div class="signature-block">
          <div class="signature-name">${cert.professorName}</div>
          <div class="signature-title">Department Overseer</div>
        </div>
      </div>

      <p class="disclaimer">
        "May your thoughts be unnecessary and your aura remain questionable."
        · This certificate confers no real qualifications, academic standing, or employment prospects.
        · Brainrot University is not accredited by anyone, anywhere, ever.
      </p>
    </div>
  </div>
</div>
</body>
</html>
  `.trim();
}
