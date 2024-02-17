import Link from "next/link";

type ProfileNavNavProps = {
  onSidebarItemClick: (path: string) => void;
};

const ProfileNav = ({ onSidebarItemClick }: ProfileNavNavProps) => {
  const navItems = [
    { path: "/profile", icon: "PP", name: "Profile" },
    {
      path: "",
      icon: "BB",
      name: "Buddies",
    },
    {
      path: "",
      icon: "D",
      name: "Discover",
    },
    { path: "", icon: "SP", name: "Settings" },
  ];

  const handleLogoClick = () => {
    onSidebarItemClick("Profile");
  };
  const handleMenuClick = (name: string) => {
    onSidebarItemClick(name);
  };
  return (
    <header className="sticky top-0 w-full bg-blue-100 md:bg-transparent rounded-lg text-xl justify-center items-center flex transition-all duration-500 ease-in-out">
      <nav className="w-full mx-auto items-center justify-center py-3">
        <ul
          className="py-5 flex lg:pb-0
               justify-center md:justify-between items-center space-x-10 lg:mb-10"
        >
          <button
            className="text-green-500 hidden md:flex flex-row items-center justify-center"
            onClick={handleLogoClick}
          >
            Logo
          </button>
          <div className="flex space-x-10">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-center md:space-x-3"
              >
                <Link
                  href={item.path}
                  onClick={() => handleMenuClick(item.name)}
                >
                  <span className="flex flex-col items-center justify-center">
                    <span className="md:hidden">{item.icon}</span>
                    <span className="mt-1 text-sm">{item.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default ProfileNav;
