export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 text-white">
      <h1 className="pb-8 text-center md:text-5xl text-4xl font-bold">About CoonSpace</h1>

      <p className="mb-12 text-center text-lg">
        Welcome to CoonSpace, a free and open-source platform dedicated to
        making styled text sharing simple and accessible for everyone. Born from the idea that sharing notes and documents online should be frictionless and beautiful, CoonSpace allows you to easily create, style, and share your thoughts and information.
      </p>

      <h2 className="pb-2 mt-6 text-3xl font-bold text-center">The Mission</h2>
      <p className="mb-12 text-center">
        Our mission is to provide a completely free and open-source tool for sharing styled text. CoonSpace is built for students, writers, developers, and anyone who needs to share notes, documents, or ideas in a visually appealing and easily shareable format.
      </p>

      <h2 className="pb-2 mt-6 text-3xl font-bold text-center">Key Features</h2>
      <ul className="mb-12 list-inside list-disc">
        <li>
          <strong>Markdown Support:</strong> Create rich text documents using Markdown syntax.
        </li>
        <li>
          <strong>Built-in Editor:</strong> Compose and style your notes directly in your browser.
        </li>
        <li>
          <strong>Easy Sharing:</strong> Generate shareable links that you can send to anyone, anywhere on the internet.
        </li>
        <li>
          <strong>Author Attribution:</strong> When you share a note, your chosen author information (name, username, photo) is displayed, giving credit where it&apos;s due (optional and customizable).
        </li>
        <li>
          <strong>Open Source:</strong> CoonSpace is fully open-source. You can view the code, contribute to its development, and even host your own instance. Find the repository on{" "}
          <a
            href="https://github.com/sleepy-gogo/coonspace"
            className="text-blue-500 underline hover:no-underline"
          >
            GitHub
          </a>
          .
        </li>
        <li>
          <strong>Free to Use:</strong> CoonSpace is and will remain free for everyone to use.
        </li>
      </ul>

      <h2 className="pb-2 mt-6 text-3xl font-bold text-center">Open Source Commitment</h2>
      <p className="mb-12 text-center">
        We are passionate about open source. CoonSpace is built with transparency and community in mind. By being open source, we encourage collaboration, continuous improvement, and ensure that the project remains accessible and trustworthy for all users. We welcome contributions from the community!
      </p>

      <h2 className="pb-2 mt-6 text-3xl font-bold text-center">Thank you for using CoonSpace!</h2>
      <p className="text-center">
       If you have any questions, feedback, or want to contribute, please don&apos;t hesitate to reach out. See our{" "}
        <a
          href="/contact"
          className="text-blue-500 underline hover:no-underline"
        >
          Contact Us
        </a>{" "}
        page.
      </p>
    </div>
  );
}
