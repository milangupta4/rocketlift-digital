export function Footer() {
    const currentYear = new Date().getFullYear(); // Get the current year
  
    return (
      <footer className="bg-lightYellow text-center p-4">
        <p className="text-gray-800 py-4">© {currentYear}  With ❤️ from India, RocketLift DM LLP</p>
        <p> All rights reserved.</p>
      </footer>
    );
  }