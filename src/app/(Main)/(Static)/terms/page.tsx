export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-white">
      <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">Terms of Service for CoonSpace</h1>
      <p className="mb-4">
        Effective Date: February 9, 2025
      </p>

      <p className="mb-4">
        Welcome to CoonSpace! These Terms of Service (&quot;Terms&quot;) govern your use of the CoonSpace website and service (collectively, the &quot;Service&quot;). By accessing or using CoonSpace, you agree to be bound by these Terms. Please read them carefully.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By using CoonSpace, you agree to these Terms of Service and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you may not use the Service.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">2. Use of the Service</h2>
      <p className="mb-4">
        CoonSpace is provided for free for sharing styled text. You agree to use the Service in accordance with these Terms and all applicable laws and regulations.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">3. User Accounts</h2>
      <p className="mb-4">
        To share notes on CoonSpace, you need to create an account via Clerk. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account and to update your information as necessary.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">4. Content and Acceptable Use</h2>
      <p className="mb-4">
        You are responsible for the content of all notes you create and share through CoonSpace (&quot;User Content&quot;). You agree not to use the Service to create or share content that is:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Illegal, harmful, threatening, abusive, harassing, defamatory, libelous, invasive of another&apos;s privacy, or otherwise objectionable.</li>
        <li>Infringing on any intellectual property rights, including copyrights, trademarks, or patents.</li>
        <li>Malicious software, viruses, or any other harmful code.</li>
        <li>Violating any applicable laws or regulations.</li>
      </ul>
      <p className="mb-4">
        We reserve the right to remove any User Content that violates these Terms or that we deem inappropriate, without prior notice and at our sole discretion. We also reserve the right to terminate or suspend your access to the Service for violations of these Terms.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">5. Intellectual Property</h2>
      <p className="mb-4">
        <strong>Your Content:</strong> You retain ownership of your User Content. By using CoonSpace, you grant us a worldwide, non-exclusive, royalty-free license to host, store, and display your User Content for the purpose of providing the Service.
      </p>
      <p className="mb-4">
        <strong>CoonSpace Service:</strong> The Service, including its design, code, and all other elements (excluding User Content), is owned by us and protected by copyright, trademark, and other intellectual property laws. These Terms do not grant you any rights to our intellectual property.  CoonSpace is open source and the code is available at <a href="https://github.com/sleepy-gogo/coonspace" className="text-blue-500 underline hover:no-underline">GitHub</a>.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">6. Disclaimer of Warranties</h2>
      <p className="mb-4">
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE MAKE NO WARRANTIES REGARDING THE RELIABILITY, ACCURACY, COMPLETENESS, OR AVAILABILITY OF THE SERVICE OR USER CONTENT.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">7. Limitation of Liability</h2>
      <p className="mb-4">
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING OUT OF YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE EXCEED USD $0.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">8. Termination</h2>
      <p className="mb-4">
        We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">9. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by and construed in accordance with the laws of Argentina, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in Santiago del Estero to resolve any dispute arising from these Terms or the Service.  CoonSpace is hosted on the Vercel platform. By using CoonSpace, you also agree to be bound by Vercel&apos;s Terms of Service and Acceptable Use Policy, which are available <a href="https://vercel.com/legal/terms" className="text-blue-500 underline hover:no-underline">here</a>. In the event of any conflict between these CoonSpace Terms of Service and Vercel&apos;s Terms, Vercel&apos;s Terms may apply to the extent they govern the operation and provision of the hosting platform.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">10. Changes to These Terms</h2>
      <p className="mb-4">
        We may modify these Terms at any time. We will post any changes on this page and update the &quot;Effective Date&quot; at the top.  Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. If you do not agree to any of these Terms or any future Terms, do not use or access (or continue to access) the Service.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-6">11. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms of Service, please contact us at:
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