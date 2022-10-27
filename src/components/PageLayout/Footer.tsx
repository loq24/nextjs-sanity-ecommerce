const d = new Date();

const Footer = () => {
  return (
    <div className="w-full py-3 px-4 mt-20 mb-10 ">
      <p className="text-sm text-gray-400 text-center">
        &copy; {d.getFullYear()} NextJS Sanity eCommerce Template. A personal
        project of{" "}
        <a
          href="https://lougiequisel.digital/"
          target="_blank"
          rel="noreferrer"
        >
          <b>Lougie Q</b>
        </a>
      </p>
    </div>
  );
};

export default Footer;
