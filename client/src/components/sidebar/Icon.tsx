function Icon({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="sidebar-icon group">
      {icon}{" "}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}

export default Icon;
