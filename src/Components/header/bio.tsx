export const Bio = () => {
  return (
    <div className="flex flex-wrap flex-col justify-center max-w-4xl">
      <h1 className="text-5xl md:text-6xl underline py-4">Nathaniel Bowman</h1>
      <h2 className="text-sm tracking-widest uppercase border-b border-gray-700 pb-3 mb-1 opacity-70">
        Senior Full-Stack &amp; Backend Engineer
      </h2>
      <p className="flex-wrap text-xl py-4 px-0 text-justify leading-relaxed">
        I design and build high-performance backend systems, real-time web
        experiences, and infrastructure for creative tools—especially for
        artists and musicians. Currently working for&nbsp;
        <a
          className="underline text-blue-500 duration-75 md:hover:-translate-y-1 inline-block"
          href="https://lightfeather.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lightfeather.io&nbsp;LLC
        </a>
        , I think critically to look for creative solutions and love
        collaboration, problem-solving, and Agile Development.
      </p>
    </div>
  );
};
