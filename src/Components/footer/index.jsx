export const Footer = () => {
  return (
    <footer className="flex flex-col min-h-[3vh] max-w-3xl mx-auto text-sm text-center p-5">
      © NATHANIEL BOWMAN {new Date().getFullYear()}. Built exclusively with
      Vite, React, and TailwindCSS. Deployed on Vercel.
    </footer>
  );
};
