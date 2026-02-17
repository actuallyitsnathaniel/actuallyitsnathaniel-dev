export const Bio = () => {
  return (
    <div className="flex flex-wrap flex-col justify-center max-w-4xl">
      <h1 className="text-5xl underline py-4">Nathaniel Bowman</h1>
      <h2 className="text-2xl font-bold">Full-Stack Software Engineer</h2>
      <p className="flex-wrap text-2xl py-4 px-6 text-justify">
        Currently working for&nbsp;
        <a
          className="underline text-blue-500 duration-75 md:hover:-translate-y-1 inline-block"
          href="https://lightfeather.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lightfeather.io&nbsp;LLC
        </a>
        , I'm a motivated software engineer who reads the documentation and
        checks the features before an update. I think critically to look for
        creative solutions. I love collaboration, problem-solving, and Agile
        Development.
      </p>
    </div>
  );
};
