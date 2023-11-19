export const Footer = () => {
  return (
    <footer className="flex flex-col items-center min-h-[3vh] text-xs text-center p-5">
      © NATHANIEL BOWMAN {new Date().getFullYear()}. Built exclusively with
      Vite, React, and TailwindCSS. Deployed on Vercel.
    </footer>
  );
};
