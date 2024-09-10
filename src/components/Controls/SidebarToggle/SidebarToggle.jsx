import "./SidebarToggle.scss";

const SidebarToggle = ({ toggled, toggle }) => {
  return (
    <div
      aria-expanded={toggled}
      onClick={toggle}
      className="sidebar-toggle btn"
    >
      <div className="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="var(--bg-light)"
            d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
          />
        </svg>
      </div>
      <div className="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="var(--bg-light)"
            d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SidebarToggle;
