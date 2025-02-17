export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-white">
      <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">Privacy Policy for CoonSpace</h1>
      <p className="mb-4">
        Effective Date: February 9, 2025
      </p>

      <p className="mb-4">
        Thank you for using CoonSpace.  Your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose information when you use CoonSpace.  As a free and open-source project, we are committed to transparency and protecting your privacy to the best of our ability while providing a valuable service.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">1. Information We Collect</h2>
      <p className="mb-4">
        We collect the following types of information:
      </p>

      <ul className="list-disc list-inside mb-4 space-y-4">
        <li>
          <strong>User Account Information (via Clerk):</strong> To enable note sharing and author attribution, CoonSpace uses Clerk for user authentication. When you create an account or sign in, Clerk may collect information such as your name, username, profile picture, and email address.  Please refer to Clerk&apos;s Privacy Policy for details on their data handling practices: <a href="https://clerk.com/legal/privacy" className="text-blue-500 underline hover:no-underline">[Link here]</a>.
        </li>
        <li>
          <strong>Notes Content:</strong> When you create notes using CoonSpace, the content of your Markdown files is stored. These files are stored in an Amazon S3 bucket, handled through UploadThing.
        </li>
        <li>
          <strong>Note Metadata:</strong> We store metadata about your notes, such as the title, slug (unique URL identifier), author information (derived from your Clerk account), and creation/update timestamps. This metadata is stored in a Turso SQLite database located in Ezeiza, Argentina.
        </li>
        <li>
          <strong>Analytics Data (via PostHog):</strong> We use PostHog, a privacy-focused analytics tool, to understand how CoonSpace is used and to improve our service.  PostHog collects anonymized data such as the number of users, file uploads, and note views. We use this data in aggregate form and do not track individual user behavior in a personally identifiable way to the best of our ability with PostHog&apos;s configurations.  For more information, please see PostHog&apos;s Privacy Policy: <a href="https://posthog.com/privacy" className="text-blue-500 underline hover:no-underline">[Link here]</a>.
        </li>
        <li>
          <strong>Cookies and Session Management (via Clerk):</strong>  Clerk uses cookies to manage user sessions and authentication. These cookies are essential for the functioning of user accounts and note sharing features.  Please refer to Clerk&apos;s Privacy Policy for details on their cookie usage.
        </li>
        <li>
          <strong>Server Logs:</strong> Like most web services, our servers may automatically log certain information, including your IP address, browser type, referring/exiting pages, operating system, date/time stamps, and related data. This information is primarily used for security, system administration, and debugging purposes.  These logs are typically retained for a limited period.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2 mt-6">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use the collected information for the following purposes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Providing and Maintaining CoonSpace:</strong> To operate CoonSpace, store your notes, and provide you with access to its features.
        </li>
        <li>
          <strong>Author Attribution:</strong> To display your chosen author information when you share notes, if you choose to enable this feature.
        </li>
        <li>
          <strong>Analytics and Improvements:</strong> To analyze usage patterns and trends to understand how CoonSpace is used and to improve its functionality, performance, and user experience.
        </li>
        <li>
          <strong>Security and Fraud Prevention:</strong> To detect, prevent, and address technical issues, security incidents, and fraudulent activities.
        </li>
        <li>
          <strong>Customer Support:</strong> To respond to your inquiries and provide support.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2 mt-6">3. Data Sharing and Disclosure</h2>
      <p className="mb-4">
        We may share your information in the following circumstances:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Public Sharing of Notes:</strong> When you share a note link, the content of that note and your chosen author information (if provided) becomes publicly accessible to anyone with the link.
        </li>
        <li>
          <strong>Third-Party Service Providers:</strong> We rely on third-party services to operate CoonSpace, including:
          <ul className="list-disc list-inside ml-4 mt-2 mb-4">
            <li><strong>Clerk:</strong> For user authentication and account management.</li>
            <li><strong>UploadThing and Amazon S3:</strong> For storing Markdown files.</li>
            <li><strong>Turso:</strong> For storing note metadata.</li>
            <li><strong>PostHog:</strong> For website analytics.</li>
          </ul>
          We choose reputable providers and encourage you to review their respective privacy policies to understand their data handling practices.
        </li>
        <li>
          <strong>Legal Compliance:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas).
        </li>
        <li>
          <strong>Protection of Rights:</strong> We may disclose information when we believe it is necessary to protect our rights, property, or safety, or the rights, property, or safety of others.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2 mt-6">4. Data Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your information from unauthorized access, use, or disclosure. These measures include using secure hosting providers, and following security best practices in development. However, no method of transmission over the internet or method of electronic storage is completely secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">5. Data Retention</h2>
      <p className="mb-4">
        We retain your information for as long as necessary to provide you with CoonSpace and as described in this Privacy Policy.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Notes:</strong> Notes you create and share will be stored until you choose to delete them.  We also reserve the right to delete notes that are reported and identified as violating our Terms of Service (e.g., containing illegal content).</li>
        <li><strong>User Account Information:</strong> User account information is managed by Clerk. Please refer to Clerk&apos;s policies regarding account data retention.</li>
        <li><strong>Server Logs:</strong> Server logs are typically retained for a limited period for security and operational purposes.</li>
        <li><strong>Analytics Data:</strong>  Analytics data in PostHog is retained according to PostHog&apos;s data retention policies.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-2 mt-6">6. Your Rights</h2>
      <p className="mb-4">
        You may have certain rights regarding your information, depending on your jurisdiction.  Generally, these may include the right to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Access:</strong>  Request access to the information we hold about you.</li>
        <li><strong>Correction:</strong>  Request correction of inaccurate or incomplete information.</li>
        <li><strong>Deletion:</strong> Request deletion of your information (to the extent possible within our systems and third-party providers).</li>
        <li><strong>Object to Processing:</strong> Object to the processing of your information.</li>
      </ul>
      <p className="mb-4">
        To exercise these rights, please contact us at <a href={`mailto:${'axelcastano@proton.me'}`} className="text-blue-500 underline hover:no-underline">axelcastano@proton.me</a>.  We will consider your request in accordance with applicable law.  For account-related data managed by Clerk, you may also have rights and controls directly within the Clerk platform.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">7. International Data Transfers</h2>
      <p className="mb-4">
        Your information may be transferred to and processed in countries other than your country of residence, including Argentina (where our Turso database is located) and potentially other countries where our third-party providers operate (e.g., the US for AWS/S3, Clerk, PostHog).  These countries may have data protection laws that are different from the laws of your country.  By using CoonSpace, you consent to the transfer of your information to these countries.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">8. Children&apos;s Privacy</h2>
      <p className="mb-4">
        CoonSpace is not intended for children under the age of 13 (or the applicable age of consent in your jurisdiction). We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">9. Changes to this Privacy Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Effective Date&quot; at the top.  We encourage you to review this Privacy Policy periodically for any changes.  Your continued use of CoonSpace after the posting of changes constitutes your acceptance of such changes.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
      </p>
      <p className="mb-4">
        Email: <a href={`mailto:${'axelcastano@proton.me'}`} className="text-blue-500 underline hover:no-underline">axelcastano@proton.me</a>
      </p>

      <p className="mt-8 text-sm text-slate-200">
      <strong>Note:</strong> CoonSpace is a free, open-source project developed by an individual. These Terms and Privacy Policy are provided as a best effort to outline the terms of service and data practices. This is not professional legal advice, and you should use CoonSpace at your own risk.
      </p>
    </div>
  );
};