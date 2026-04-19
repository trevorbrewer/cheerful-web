import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDonationReceipt({
  toEmail,
  toName,
  charityName,
  totalRoundup,
  cheerfulFee,
  charityAmount,
  transactionCount,
  month,
  year,
}: {
  toEmail: string;
  toName: string;
  charityName: string;
  totalRoundup: number;
  cheerfulFee: number;
  charityAmount: number;
  transactionCount: number;
  month: string;
  year: number;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  await resend.emails.send({
    // from: "Cheerful <giving@cheerful.org>",
    from: "Cheerful <onboarding@resend.dev>",
    to: toEmail,
    subject: `Your ${month} donation to ${charityName} 🌱`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Georgia, serif; background-color: #F8F4EE; margin: 0; padding: 40px 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden;">
            
            <div style="background-color: #2D6A4F; padding: 40px; text-align: center;">
              <p style="color: white; font-size: 32px; margin: 0 0 8px;">🌱</p>
              <h1 style="color: white; font-size: 28px; margin: 0 0 8px;">cheerful</h1>
              <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0; font-family: sans-serif;">
                Make life full.
              </p>
            </div>

            <div style="padding: 40px;">
              <p style="font-family: sans-serif; font-size: 14px; color: #1C1C1E; margin: 0 0 24px;">
                Hi ${toName},
              </p>
              <p style="font-family: sans-serif; font-size: 14px; color: #1C1C1E; line-height: 1.6; margin: 0 0 32px;">
                Your ${month} round-ups have been sent to <strong>${charityName}</strong>. 
                Thank you for making life full.
              </p>

              <div style="background: #F8F4EE; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                <h2 style="font-size: 16px; color: #1C1C1E; margin: 0 0 16px;">
                  ${month} ${year} Summary
                </h2>
                <table style="width: 100%; font-family: sans-serif; font-size: 14px;">
                  <tr>
                    <td style="color: #666; padding: 6px 0;">
                      Total round-ups (${transactionCount} transactions)
                    </td>
                    <td style="text-align: right; color: #1C1C1E; padding: 6px 0;">
                      ${formatter.format(totalRoundup)}
                    </td>
                  </tr>
                  <tr style="border-top: 1px solid #E0DDD6;">
                    <td style="color: #1C1C1E; font-weight: bold; padding: 12px 0 6px;">
                      Donated to ${charityName}
                    </td>
                    <td style="text-align: right; color: #2D6A4F; font-weight: bold; padding: 12px 0 6px;">
                      ${formatter.format(charityAmount)}
                    </td>
                  </tr>
                </table>
              </div>

              <p style="font-family: sans-serif; font-size: 12px; color: #999; line-height: 1.6; margin: 0;">
                This receipt is for your records. Cheerful is a registered 501(c)(3) nonprofit. 
                Your donation to ${charityName} may be tax deductible — please consult your tax advisor.
              </p>
            </div>

            <div style="background: #F8F4EE; padding: 24px; text-align: center;">
              <p style="font-family: sans-serif; font-size: 12px; color: #999; margin: 0;">
                Cheerful · Make life full · 
                <a href="https://cheerful.org" style="color: #2D6A4F;">cheerful.org</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}