export const Bio = () => {
  return (
    <div className="flex flex-wrap flex-col justify-center max-w-4xl">
      <h1 className="text-5xl underline py-4">Nathaniel Bowman</h1>
      <h2 className="text-2xl font-bold">Senior Full-Stack & Backend Engineer</h2>
      <p className="flex-wrap text-2xl py-4 px-6 text-justify">
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
