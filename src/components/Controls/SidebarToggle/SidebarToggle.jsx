import "./SidebarToggle.scss";

const SidebarToggle = ({ toggled, toggle }) => {
  return (
    <div
      aria-expanded={toggled}
      onClick={toggle}
      className="sidebar-toggle btn"
    >
      <div className="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22">
          <path
            fill="var(--bg-light)"
            d="M6.9395 4.707 14.2325 12 6.9395 19.293 8.3535 20.707 17.0605 12 8.3535 3.293 6.9395 4.707Z"
          />
        </svg>
      </div>
      <div className="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22">
          <path
            fill="var(--bg-light)"
            d="M6.9395 4.707 14.2325 12 6.9395 19.293 8.3535 20.707 17.0605 12 8.3535 3.293 6.9395 4.707Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SidebarToggle;
