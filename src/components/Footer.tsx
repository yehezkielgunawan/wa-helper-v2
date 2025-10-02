/* Footer.tsx
 * A simple footer component for WA Helper.
 * Displays attribution and links to the personal website in a new tab.
 */

export const Footer = () => {
  return (
    <footer class="mt-12 py-6 text-center">
      <p class="text-xs text-gray-500">
        Made by{" "}
        <a
          href="https://yehezgun.com"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium underline decoration-dotted underline-offset-4 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
        >
          Yehezkiel Gunawan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
